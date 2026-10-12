import sys, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
SRC="../images/22.jpg"
FD="fonts/"
ANTON=FD+"fontsource-anton/package/files/anton-latin-400-normal.woff"
SERIF=FD+"fontsource-playfair-display/package/files/playfair-display-latin-500-italic.woff"
SANS=FD+"package/files/montserrat-latin-700-normal.woff"
INK=(28,24,22); RED=(214,52,22)

head_lines, strip_txt, strip_ul, bottom_lines, bottom_ul, out = (sys.argv[1].split("|"), sys.argv[2], sys.argv[3],
    sys.argv[4].split("|"), sys.argv[5], sys.argv[6])

im=Image.open(SRC).convert("RGB")
def patch(dst, src_y):           # matnni toza to'q sariq qog'oz bilan yopish (yumshoq chetlar)
    x0,y0,x1,y1=dst; p=im.crop((x0,src_y,x1,src_y+(y1-y0)))
    m=Image.new("L",p.size,0); ImageDraw.Draw(m).rectangle((6,6,p.width-7,p.height-7),fill=255)
    im.paste(p,(x0,y0),m.filter(ImageFilter.GaussianBlur(4)))
patch((70,222,495,338),95)
patch((110,585,455,640),655)
# oq qog'oz ichidagi matnni o'chirish (inpaint)
a=np.asarray(im).astype(float)
X0,Y0,X1,Y1=145,383,495,446
reg=a[Y0:Y1,X0:X1]
mask=(reg.sum(2)<380)&(reg[...,0]<130)   # faqat qora siyoh, to'q sariq chetga tegmaydi
yy,xx=np.mgrid[Y0:Y1,X0:X1]
mask|=((reg[...,0]-reg[...,1])>45)&(xx>185)&(xx<290)&(yy>422)   # faqat "not" ostidagi qizil chiziq
mimg=Image.fromarray((mask*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
mask=np.asarray(mimg)>0
fill=reg.copy(); known=(~mask).astype(float)
for r in (3,6,12,24):
    num=np.asarray(Image.fromarray(np.clip(fill*known[...,None],0,255).astype(np.uint8)).filter(ImageFilter.BoxBlur(r))).astype(float)
    den=np.asarray(Image.fromarray((known*255).astype(np.uint8)).filter(ImageFilter.BoxBlur(r))).astype(float)/255
    est=num/np.maximum(den[...,None],1e-3)
    upd=(known==0)&(den>0.05)
    fill[upd]=est[upd]; known[upd]=1
noise=np.random.default_rng(1).normal(0,2.2,fill.shape)
fill[mask]=np.clip(fill[mask]+noise[mask],0,255)
a[Y0:Y1,X0:X1]=fill
im=Image.fromarray(a.astype(np.uint8))

S=3
im=im.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.UnsharpMask(2,90,2))
W,H=im.size; d=ImageDraw.Draw(im)

def brush(x0,x1,y,th):
    pts_t=[];pts_b=[]
    n=40
    for i in range(n+1):
        t=i/n; x=x0+(x1-x0)*t; yy=y-6*np.sin(np.pi*t)+t*4
        w=th*(0.35+0.65*np.sin(np.pi*min(1,t*1.15)))
        pts_t.append((x,yy-w/2)); pts_b.append((x,yy+w/2))
    d.polygon(pts_t+pts_b[::-1],fill=RED)

# sarlavha
maxw=1290; size=400
f=ImageFont.truetype(ANTON,size)
while max(d.textlength(l,font=f) for l in head_lines)>maxw: size-=4; f=ImageFont.truetype(ANTON,size)
lh=size*1.02; bottom=950; y=bottom-lh*len(head_lines)
for l in head_lines:
    w=d.textlength(l,font=f); d.text(((W-w)/2,y),l,font=f,fill=INK); y+=lh
# qog'ozdagi matn
size=110; f=ImageFont.truetype(SERIF,size)
while d.textlength(strip_txt,font=f)>1010: size-=2; f=ImageFont.truetype(SERIF,size)
w=d.textlength(strip_txt,font=f); x=966-w/2; ty=1232-size*0.62
d.text((x,ty),strip_txt,font=f,fill=INK)
if strip_ul and strip_ul in strip_txt:
    i=strip_txt.index(strip_ul); ux0=x+d.textlength(strip_txt[:i],font=f); ux1=ux0+d.textlength(strip_ul,font=f)
    brush(ux0-6,ux1+4,ty+size*1.22,15)
# pastki yozuv (harflar orasi kengaytirilgan)
fs=ImageFont.truetype(SANS,44); sp=9
def spaced_w(t): return sum(d.textlength(c,font=fs) for c in t)+sp*(len(t)-1)
y=1772
for l in bottom_lines:
    w=spaced_w(l); x=(W-w)/2; start=x
    for c in l: d.text((x,y),c,font=fs,fill=INK); x+=d.textlength(c,font=fs)+sp
    if bottom_ul and bottom_ul in l:
        i=l.index(bottom_ul); ux0=start+spaced_w(l[:i])+(sp if i else 0); ux1=ux0+spaced_w(bottom_ul)
        brush(ux0,ux1,y+70,12)
    y+=80
im.save(out,quality=95)
