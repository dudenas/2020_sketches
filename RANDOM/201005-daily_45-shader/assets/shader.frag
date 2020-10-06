#ifdef GL_ES
precision mediump float;
#endif
// precision highp float;

// Shader Inputs
uniform sampler2D iChannel0;                 
uniform vec2 iResolution;           
uniform float iTime;         
varying vec2 vTexCoord;        

void main()
{   
    float time = iTime * .01;
    // vec2 uv = gl_FragColor.xy / iResolution.xy;
    // vec2 cv = (gl_FragColor.xy - .5* iResolution.xy) / iResolution.y;
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec2 cv = (gl_FragColor.xy - .5* iResolution.xy) / iResolution.y;
    vec4 tex = texture2D(iChannel0, uv);
    gl_FragColor = tex;
}

