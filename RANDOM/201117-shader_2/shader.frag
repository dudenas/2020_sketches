#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

// Paint colors.
vec3 red=vec3(.725,.141,.149);
vec3 blue=vec3(.012,.388,.624);
vec3 yellow=vec3(.988,.784,.173);
vec3 beige=vec3(.976,.949,.878);
vec3 black=vec3(.078,.09,.114);

float Band(float pos,float width)
{
    float halfWidth=width*.5;
    return step(-halfWidth,pos)-step(halfWidth,pos);
}

// uses 2 bands
float Rectangle(vec2 pos,float width,float height)
{
    return Band(pos.x,width)*Band(pos.y,height);
}

void main(){
    // Normalized pixel coordinates
    // fragCoord(from 0.0 to 1.0) left to right
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    
    // center origin
    uv-=.5;
    
    // uv *= 1.25;
    
    // adjust for aspect ratio
    // uv.x*=u_resolution.x/u_resolution.y;
    // flip x coords, not sure why their wrong...
    uv.x=-uv.x;
    
    float width=.1;
    float height=.3;
    float margin=.025;
    
    // set background to beige
    vec3 col=beige;
    
    // red areas
    vec2 rectPos=vec2(uv.x-width*5.,uv.y-height-.1);
    float redRect=Rectangle(rectPos,width*3.,height);
    
    // yellow areas
    rectPos.x=uv.x+width*6.;
    float yellowRect=Rectangle(rectPos,width,height);
    
    // blue areas
    rectPos.y=uv.y+height*1.5;
    float blueRect=Rectangle(rectPos,width,height*2.);
    
    // black lines, 4 vertcal, 2 horizontal
    rectPos=vec2(uv.x,uv.y);
    float blackRect=Band(rectPos.x-width*4.75,margin);
    blackRect+=Band(rectPos.x-width*3.5,margin);
    blackRect+=Band(rectPos.x+width*3.,margin);
    blackRect+=Band(rectPos.x+width*5.5,margin);
    
    // horizontal
    blackRect+=Band(rectPos.y-height+.05,margin);
    blackRect+=Band(rectPos.y+height*.5,margin);
    
    // beige rect for touchup
    rectPos=vec2(uv.x-width*5.1,uv.y+height*1.3);
    float beigeRect=Rectangle(rectPos,width*3.,height*1.51);
    
    col=mix(col,red,redRect);
    col=mix(col,yellow,yellowRect);
    col=mix(col,blue,blueRect);
    col=mix(col,black,blackRect);
    col=mix(col,beige,beigeRect);
    
    gl_FragColor=vec4(col,1.);
}
