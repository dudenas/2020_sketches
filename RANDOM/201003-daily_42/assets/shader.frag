#define PI 3.14159365
#define TAU 6.28318531
#ifdef GL_ES
precision mediump float;
#endif
precision highp float;

// Shader Inputs
uniform vec2      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform sampler2D iChannel0;          // input channel. XX = 2D/Cube

// hash from https://www.shadertoy.com/view/4djSRW

// float hash11(float p)
// {
//     p = fract(p * .1031);
//     p *= p + 33.33;
//     p *= p + p;
//     return fract(p);
// }

float cubicPulse( float c, float w, float x )
{
    x = abs(x - c);
    if( x>w ) return 0.0;
    x /= w;
    return 1.0 - x*x*(3.0-2.0*x);
}

float noise(vec2 uv){
 	return texture2D(iChannel0, uv).r;   
}

float noiseAA(vec2 uv){
    float pixelThird = (1./iResolution.x) / 3.0;
    vec2 aa = vec2(-pixelThird, pixelThird);
    float c1 = noise(uv+aa.xx);
    float c2 = noise(uv+aa.xy);
    float c3 = noise(uv+aa.yx);
    float c4 = noise(uv+aa.yy);
    return (c1+c2+c3+c4) / 4.;
}

void main()
{   
    // colorPoint[colorsPerGradient] gradient = colorPoint[](
    //     colorPoint(0.0, vec4(vec3(0), 1.)),
    //     colorPoint(0.25, vec4(hexToRgb(0x6a2c70), 1.)),
    //     colorPoint(0.5,  vec4(hexToRgb(0xb83b5e), 1.)),
    //     colorPoint(0.7, vec4(hexToRgb(0xf08a5d), 1.)),
    //     colorPoint(1., vec4(hexToRgb(0xeeecda), 1.))
    // );
    // float time = iTime * .01;
    // vec2 uv = gl_FragColor.xy / iResolution.xy;
    // vec2 cv = (gl_FragColor.xy - .5* iResolution.xy) / iResolution.y;
    // vec2 noiseUV = uv*vec2(0.05, 0.02)+vec2(0., -time*.05);
    // float noise = noiseAA(noiseUV+vec2(0, -time) 
    //                       + .25*noiseAA(noiseUV) 
    //                       + .001*noiseAA(noiseUV*50.0)); // a misplaced bracket is now intentional
    // float fadeout = cubicPulse(0., 2., length(cv.x));
    // gl_FragColor = gradientColorAt(fadeout-noise, gradient, 0);
    gl_FragColor = vec4(1., 1., 0., 1.0);
}

const int colorsPerGradient = 5;

//---------------------------------------------------------------------------------
//--------------------------------Color Functions----------------------------------
//------------------by nmz: https://www.shadertoy.com/view/XddGRN------------------

//-----------------HSV-----------------

//HSV functions from iq (https://www.shadertoy.com/view/MsS3Wc)
#ifdef SMOOTH_HSV
vec3 hsv2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    rgb = rgb*rgb*(3.0-2.0*rgb); // cubic smoothing

    return c.z * mix( vec3(1.0), rgb, c.y);
}
#else
vec3 hsv2rgb(in vec3 c)
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z * mix( vec3(1.0), rgb, c.y);
}
#endif

//From Sam Hocevar: http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

//Linear interpolation between two colors in normalized (0..1) HSV space
vec3 lerpHSV(in vec3 a, in vec3 b, in float x)
{
    float hue = (mod(mod((b.x-a.x), 1.) + 1.5, 1.)-0.5)*x + a.x;
    return vec3(hue, mix(a.yz, b.yz, x));
}

//---------------Improved RGB--------------

/*
The idea behind this function is to avoid the low saturation area in the
rgb color space. This is done by getting the direction to that diagonal
and displacing the interpolated	color by it's inverse while scaling it
by saturation error and desired lightness.

I find it behaves very well under most circumstances, the only instance
where it doesn't behave ideally is when the hues are very close	to 180
degrees apart, since the method I am using to find the displacement vector
does not compensate for non-curving motion. I tried a few things to
circumvent this problem but none were cheap and effective enough..
*/

//Changes the strength of the displacement
#define DSP_STR 1.5

//Optimizaton for getting the saturation (HSV Type) of a rgb color
#if 0
float getsat(vec3 c)
{
    c.gb = vec2(max(c.g, c.b), min(c.g, c.b));
    c.rg = vec2(max(c.r, c.g), min(c.r, c.g));
    return (c.r - min(c.g, c.b)) / (c.r + 1e-7);
}
#else
//Further optimization for getting the saturation
float getsat(vec3 c)
{
    float mi = min(min(c.x, c.y), c.z);
    float ma = max(max(c.x, c.y), c.z);
    return (ma - mi)/(ma+ 1e-7);
}
#endif

//Improved rgb lerp
vec3 iLerp(in vec3 a, in vec3 b, in float x)
{
    //Interpolated base color (with singularity fix)
    vec3 ic = mix(a, b, x) + vec3(1e-6,0.,0.);
    //Saturation difference from ideal scenario
    float sd = abs(getsat(ic) - mix(getsat(a), getsat(b), x));
    //Displacement direction
    vec3 dir = normalize(vec3(2.*ic.x - ic.y - ic.z, 2.*ic.y - ic.x - ic.z, 2.*ic.z - ic.y - ic.x));
    //Simple Lighntess
    float lgt = dot(vec3(1.0), ic);
    //Extra scaling factor for the displacement
    float ff = dot(dir, normalize(ic));
    //Displace the color
    ic += DSP_STR*dir*sd*ff*lgt;
    return clamp(ic,0.,1.);
}

vec3 hsb2rgb(in vec3 hsb)
{
    vec3 rgb = clamp(abs(mod(hsb.x*6.0+vec3(0.0, 4.0, 2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return hsb.z * mix(vec3(1.0), rgb, hsb.y);
}


//--------------------------------------GRADIENT-----------------------------------
//--------------------------------color point array logic--------------------------
//-------------------------------------by Krabcode---------------------------------

const struct colorPoint
{
    float pos;
    vec4 val;
};

float map(float value, float start1, float stop1, float start2, float stop2)
{
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

float norm(float value, float start, float stop)
{
    return map(value, start, stop, 0., 1.);
}

vec4 lerpByBlendType(vec4 colorA, vec4 colorB, float amt, int blendType)
{
    float mixedAlpha = mix(colorA.a, colorB.a, amt);
    if(blendType == 0){ // normal lerp
        return mix(colorA, colorB, amt);
    }
    if(blendType == 1){ // normal lerp with improved saturation preservation
        return vec4(iLerp(colorA.rgb, colorB.rgb, amt), mixedAlpha);
    }
    if(blendType == 2){ // lerp between hues
        return vec4(hsv2rgb(lerpHSV(rgb2hsv(colorA.rgb), rgb2hsv(colorB.rgb), smoothstep(0.0, 1.0, amt))), mixedAlpha);
    }
    return vec4(0,0,0,1);
}


int findClosestLeftNeighbourIndex(float pos, colorPoint[colorsPerGradient] gradient)
{
    for(const int i = 0; i < 100; i++){
        // if(pos >= gradient[i].pos && pos <= gradient[i+1].pos){
        //     return i;
        // }
        if(i >= gradient.length()){
            return 0;
        }
    }
    return 0;
}

// vec4 gradientColorAt(float normalizedPos, colorPoint[colorsPerGradient] gradient, int blendType)
// {
//     float pos = clamp(normalizedPos, 0., 1.);
//     int leftIndex = findClosestLeftNeighbourIndex(pos, gradient);
//     int rightIndex = leftIndex + 1;
//     colorPoint A = gradient[leftIndex];    
//     colorPoint B = gradient[rightIndex];
//     float normalizedPosBetweenNeighbours = norm(pos, A.pos, B.pos);
//     vec4 mixedColor = lerpByBlendType(A.val, B.val, normalizedPosBetweenNeighbours, blendType);
//     return mixedColor;
// }

const colorPoint emptyColorPoint()
{
    return colorPoint(1., vec4(1.,0.,0.,1.));
}

// // hexToRgb from here: https://stackoverflow.com/questions/22895237/hexadecimal-to-rgb-values-in-webgl-shader
vec3 hexToRgb(int color)
{
    float rValue = float(color / 256 / 256);
    float gValue = float(color / 256 - int(rValue * 256.0));
    float bValue = float(color - int(rValue * 256.0 * 256.0) - int(gValue * 256.0));
    return vec3(rValue / 255.0, gValue / 255.0, bValue / 255.0);
}


// dot noise from here: http://www.science-and-fiction.org/rendering/noise.html
float rand2D(in vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
float rand3D(in vec3 co){
    return fract(sin(dot(co.xyz ,vec3(12.9898,78.233,144.7272))) * 43758.5453);
}

float dotNoise2D(in float x, in float y, in float fractionalMaxDotSize, in float dDensity)
{
    float integer_x = x - fract(x);
    float fractional_x = x - integer_x;
	float zero = 0.;
    float integer_y = y - fract(y);
    float fractional_y = y - integer_y;

    if (rand2D(vec2(integer_x+1.0, integer_y +1.0)) > dDensity)
    {return 0.0;}

    float xoffset = (rand2D(vec2(integer_x, integer_y)) -0.5);
    float yoffset = (rand2D(vec2(integer_x+1.0, integer_y)) - 0.5);
    float dotSize = 0.5 * fractionalMaxDotSize * max(0.25,rand2D(vec2(integer_x, integer_y+1.0)));

    vec2 truePos = vec2 (0.5 + xoffset * (1.0 - 2.0 * dotSize) , 0.5 + yoffset * (1.0 -2.0 * dotSize));

    float distance = length(truePos - vec2(fractional_x, fractional_y));

    return 1.0 - smoothstep (0.3 * dotSize, 1.0* dotSize, distance);
}