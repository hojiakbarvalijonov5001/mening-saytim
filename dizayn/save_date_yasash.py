import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
P="fonts/fs-poppins/package/files/poppins-latin-%d-normal.woff"
SCRIPT="fonts/fs-dancing-script/package/files/dancing-script-latin-700-normal.woff"
orig=Image.open("../images/25.jpg").convert("RGB")
a=np.asarray(orig).astype(float)
def fill_rows(x0,y0,x1,y1):
    L=a[y0:y1,x0-4:x0-1].mean(1); R=a[y0:y1,x1+1:x1+4].mean(1)
    t=np.linspace(0,1,x1-x0)[None,:,None]
    a[y0:y1,x0:x1]=L[:,None,:]*(1-t)+R[:,None,:]*t
def fill_cols(x0,y0,x1,y1):
    T=a[y0-4:y0-1,x0:x1].mean(0); B=a[y1+1:y1+4,x0:x1].mean(0)
    t=np.linspace(0,1,y1-y0)[:,None,None]
    a[y0:y1,x0:x1]=T[None]*(1-t)+B[None]*t
boxes=[]
def rows(*b): fill_rows(*b); boxes.append(b)
def cols(*b): fill_cols(*b); boxes.append(b)
rows(30,28,255,92); rows(380,28,528,116)          # logolar
rows(130,216,436,284)                              # sarlavha
rows(110,302,206,327)                              # oy nomi
for x0,x1 in [(117,145),(166,196),(420,448)]: cols(x0,340,x1,359)   # hafta kunlari
for y0,y1 in [(372,393),(411,432),(448,469),(483,504),(517,539)]:
    cols(116,y0,146,y1); cols(421,y0,447,y1)
cols(166,517,196,539)
rows(412,365,460,404)                              # ko'k ramka
rows(190,650,380,682)                              # instagram
# markazdagi oq yozuvlarni qizil fon bilan almashtirish
X0,Y0,X1,Y1=212,356,352,496
reg=a[Y0:Y1,X0:X1]; mask=(reg.min(2)>95)
tb=np.zeros_like(mask)
for bx0,by0,bx1,by1 in [(224,360,342,384),(226,397,340,436),(230,436,338,466),(238,473,332,491)]:
    tb[by0-Y0:by1-Y0,bx0-X0:bx1-X0]=True
mask&=tb                                   # faqat yozuvlar, yirtiq qog'oz chetiga tegmaydi
mask=np.asarray(Image.fromarray((mask*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)))>0
fill=reg.copy(); known=(~mask).astype(float)
for r in (2,4,8,16,32):
    num=np.asarray(Image.fromarray(np.clip(fill*known[...,None],0,255).astype(np.uint8)).filter(ImageFilter.BoxBlur(r))).astype(float)
    den=np.asarray(Image.fromarray((known*255).astype(np.uint8)).filter(ImageFilter.BoxBlur(r))).astype(float)/255
    est=num/np.maximum(den[...,None],1e-3); upd=(known==0)&(den>0.05); fill[upd]=est[upd]; known[upd]=1
a[Y0:Y1,X0:X1]=fill
filled=Image.fromarray(np.clip(a,0,255).astype(np.uint8))
m=Image.new("L",orig.size,0); md=ImageDraw.Draw(m)
for x0,y0,x1,y1 in boxes: md.rectangle((x0,y0,x1,y1),fill=255)
md.rectangle((X0,Y0,X1,Y1),fill=255)
im=Image.composite(filled.filter(ImageFilter.GaussianBlur(1)),orig,m.filter(ImageFilter.GaussianBlur(1.5)))
im.paste(filled.crop((X0+3,Y0+3,X1-3,Y1-3)),(X0+3,Y0+3),Image.fromarray((mask[3:-3,3:-3]*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1)))

S=3
im=im.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.UnsharpMask(2,80,2)).convert("RGBA")
d=ImageDraw.Draw(im); W,H=im.size
F=lambda w,s: ImageFont.truetype(P%w,s)
def ctext(cx,y,t,f,fill,sp=0,dr=d):
    w=sum(dr.textlength(c,font=f) for c in t)+sp*(len(t)-1) if sp else dr.textlength(t,font=f)
    x=cx-w/2
    if sp:
        for c in t: dr.text((x,y),c,font=f,fill=fill); x+=dr.textlength(c,font=f)+sp
    else: dr.text((x,y),t,font=f,fill=fill)
CC=283*S          # karta markazi
# sarlavha
f=F(700,118)
while d.textlength("Katta Biznes Forum",font=f)>300*S: f=F(700,f.size-2)
ctext(CC,214*S,"Katta Biznes Forum",f,(32,32,34))
ctext(CC,262*S,"QO’QON SHAHRIDA",F(600,40),(32,32,34),sp=14)
# kalendar
GR=(70,70,72); LG=(150,150,152)
d.text((118*S,303*S),"Oktabr 2026",font=F(400,50),fill=GR)
fh=F(500,40)
for x0,x1,t in [(117,145,"Du"),(166,196,"Se"),(420,448,"Ya")]: ctext((x0+x1)/2*S,341*S,t,fh,GR)
fn=F(400,48)
left=["28","5","12","19","26"]; right=["4","11","18","25","1"]
for i,(y0,y1) in enumerate([(372,393),(411,432),(448,469),(483,504),(517,539)]):
    ctext(131*S,(y0+2)*S,left[i],fn,LG if i==0 else GR)
    ctext(434*S,(y0+2)*S,right[i],fn,LG if i==4 else GR)
ctext(181*S,519*S,"27",fn,GR)
# markaz: sana
glow=Image.new("RGBA",(W,H),(0,0,0,0)); g=ImageDraw.Draw(glow)
ctext(CC,360*S,"Sanani belgilang!",ImageFont.truetype(SCRIPT,66),(255,255,255,255),dr=g)
ctext(CC,386*S,"29",F(800,170),(255,255,255,255),dr=g)
ctext(CC,440*S,"OKTABR",F(700,92),(255,255,255,255),dr=g)
ctext(CC,482*S,"2026",F(400,40),(255,225,225,255),sp=34,dr=g)
sh=Image.new("RGBA",(W,H),(90,0,0,0)); sh.putalpha(glow.getchannel("A").filter(ImageFilter.GaussianBlur(10)).point(lambda v:v*0.6))
im.alpha_composite(sh); im.alpha_composite(glow)
# pastdagi chaqiriq
d=ImageDraw.Draw(im)
t="Hoziroq biznes forumga ro’yxatdan o’ting!"; f=F(600,50)
w=d.textlength(t,font=f); bx0,bx1=W/2-w/2-50,W/2+w/2+50; by0,by1=646*S,(646+36)*S
d.rounded_rectangle((bx0,by0,bx1,by1),radius=(by1-by0)//2,outline=(255,255,255),width=4)
ctext(W/2,by0+(by1-by0)/2-36,t,f,(255,255,255))
im.convert("RGB").save("/home/user/mening-saytim/dizayn/forum-save-date.jpg",quality=95)
