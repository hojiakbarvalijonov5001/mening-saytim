import sys, math, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
FD="fonts/package/files/"
F_HEAD=FD+"montserrat-latin-400-normal.woff"; F_TILE=FD+"montserrat-latin-700-normal.woff"
im=Image.open("../images/24.jpg").convert("RGB")
a=np.asarray(im).astype(float)
orig=Image.open("../images/24.jpg").convert("RGB")
def fill_rows(x0,y0,x1,y1):          # har bir qatorni chap va o'ng chetdan chiziqli to'ldirish
    L=a[y0:y1,x0-4:x0-1].mean(1); R=a[y0:y1,x1+1:x1+4].mean(1)
    t=np.linspace(0,1,x1-x0)[None,:,None]
    a[y0:y1,x0:x1]=L[:,None,:]*(1-t)+R[:,None,:]*t
boxes=[(18,22,140,95),(90,105,478,200),(185,398,360,700)]
for b in boxes: fill_rows(*b)
filled=Image.fromarray(np.clip(a,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.5))
mask=Image.new("L",orig.size,0); md=ImageDraw.Draw(mask)
for x0,y0,x1,y1 in boxes: md.rectangle((x0+4,y0+4,x1-4,y1-4),fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(5))
im=Image.composite(filled,orig,mask)
a2=np.asarray(im).copy(); a2[:3]=a2[3]; im=Image.fromarray(a2)
S=3
im=im.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.UnsharpMask(2,80,2)).convert("RGBA")
W,H=im.size
# nur konusi
cone=Image.new("RGBA",(W,H),(0,0,0,0)); c=ImageDraw.Draw(cone)
c.polygon([(250*S,385*S),(322*S,385*S),(410*S,700*S),(165*S,700*S)],fill=(255,205,140,70))
im.alpha_composite(cone.filter(ImageFilter.GaussianBlur(60)))
# sarlavha
d=ImageDraw.Draw(im)
lines=sys.argv[1].split("|"); size=96
f=ImageFont.truetype(F_HEAD,size)
while max(d.textlength(l,font=f) for l in lines)>W-260: size-=2; f=ImageFont.truetype(F_HEAD,size)
txt=Image.new("RGBA",(W,H),(0,0,0,0)); td=ImageDraw.Draw(txt)
lh=size*1.18; y=(125*S+195*S)/2-lh*len(lines)/2-size*0.1
for l in lines:
    w=td.textlength(l,font=f); td.text(((W-w)/2,y),l,font=f,fill=(255,255,255,255)); y+=lh
grad=Image.new("RGBA",(W,H)); gd=ImageDraw.Draw(grad)
for yy in range(H): t=min(1,max(0,(yy-300)/320)); gd.line([(0,yy),(W,yy)],fill=(255,round(222-30*t),round(196-40*t),255))
glow=Image.new("RGBA",(W,H),(255,190,140,0)); glow.putalpha(txt.getchannel("A").filter(ImageFilter.GaussianBlur(10)).point(lambda v:v*0.45))
im.alpha_composite(glow); im.paste(grad,(0,0),txt.getchannel("A"))
# og'riqlar plashkalari (karta belgisiz)
pains=sys.argv[2].split("|")
cols=[((24,22,26),"w"),((30,42,64),"w"),((236,214,172),"d"),((214,92,44),"w"),((168,34,30),"w"),((28,36,56),"w"),((24,22,26),"w"),((200,72,40),"w")]
pos=[(302,428,-7),(250,463,6),(318,497,-9),(245,531,8),(316,566,-5),(250,600,-8),(318,634,7),(258,668,-4)]
ft=ImageFont.truetype(F_TILE,30)
for i,(p,(cx,cy,ang)) in enumerate(zip(pains,pos)):
    sc=0.74+0.16*i/(len(pains)-1)
    tw,th=int(124*S*sc),int(42*S*sc)
    col,tc=cols[i%len(cols)]
    words=p.upper().split(); fsz=int(36*sc)
    fnt=ImageFont.truetype(F_TILE,fsz)
    tmp=ImageDraw.Draw(Image.new("L",(1,1)))
    while len(words)==1 and tmp.textlength(p.upper(),font=fnt)>tw-40: fsz-=1; fnt=ImageFont.truetype(F_TILE,fsz)
    lines=[p.upper()] if tmp.textlength(p.upper(),font=fnt)<=tw-40 else None
    if not lines:
        best=None
        for k in range(1,len(words)):
            m=max(tmp.textlength(" ".join(words[:k]),font=fnt),tmp.textlength(" ".join(words[k:]),font=fnt))
            if best is None or m<best[0]: best=(m,[" ".join(words[:k])," ".join(words[k:])])
        lines=best[1]
    pad=40; tile=Image.new("RGBA",(tw+2*pad,th+2*pad),(0,0,0,0)); t=ImageDraw.Draw(tile)
    t.rounded_rectangle((pad,pad,pad+tw,pad+th),radius=int(14*sc),fill=col+(255,))
    # yuqori chetdagi yengil yorug'lik
    t.rounded_rectangle((pad,pad,pad+tw,pad+th),radius=int(14*sc),outline=(255,255,255,40),width=2)
    fc=(255,255,255) if tc=="w" else (40,30,28)
    lh=fsz*1.15; ty=pad+th/2-lh*len(lines)/2
    for l in lines:
        w=t.textlength(l,font=fnt); t.text((pad+tw/2-w/2,ty),l,font=fnt,fill=fc); ty+=lh
    tile=tile.rotate(ang,resample=Image.BICUBIC,expand=False)
    sh=Image.new("RGBA",tile.size,(0,0,0,0)); sh.putalpha(tile.getchannel("A").point(lambda v:v*0.55))
    sh=sh.filter(ImageFilter.GaussianBlur(14))
    x=int(cx*S-tile.width/2); y=int(cy*S-tile.height/2)
    im.alpha_composite(sh,(x+10,y+18)); im.alpha_composite(tile,(x,y))
im.convert("RGB").save(sys.argv[3],quality=95)
