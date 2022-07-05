# 3DCakeMaker
A full-stack MVP web app that generates beautiful 3D CSS-only cakes and store their data on the cloud.

**Fun fact**: I created this to celebrate a friend's birthday!

**Link to project:** https://css3dcakemaker.herokuapp.com/

![CSS 3D sample cake](https://github.com/khanhtranngoccva/3DCakeMaker/raw/main/sampleCake.png)

## How It's Made:

**Tech used:**
<img src="https://img.shields.io/static/v1?label=|&message=HTML5&color=red&logo=html5&labelColor=white" alt="HTML5"/>
<img src="https://img.shields.io/static/v1?label=|&message=CSS3&color=dodgerblue&logo=css3&labelColor=white&logoColor=dodgerblue" alt="CSS3"/>
<img src="https://img.shields.io/static/v1?label=|&message=JavaScript&color=yellow&logo=javascript&labelColor=white&logoColor=yellow" alt="JavaScript"/>
<img src="https://img.shields.io/static/v1?label=|&message=NodeJS&color=darkgreen&logo=nodedotjs&labelColor=white&logoColor=darkgreen" alt="NodeJS"/>
<img src="https://img.shields.io/static/v1?label=|&message=MongoDB&color=|&logo=mongodb&labelColor=white&logoColor=|" alt="ExpressJS"/>
<img src="https://img.shields.io/static/v1?label=|&message=ExpressJS&color=black&logo=express&labelColor=white&logoColor=black" alt="MongoDB"/>
<img src="https://img.shields.io/static/v1?label=|&message=Webpack&color=dodgerblue&logo=webpack&labelColor=white&logoColor=dodgerblue" alt="Webpack"/>

* This app is made with the help of my homemade framework DimensionCSS. I used this to construct basic boxes for the base and icing of the cake, as well as toppings.
* The cake's colors was stored in CSS custom properties, allow easy propagation to child elements when the cake is edited.
* Each cake property like the color of the frosting has a default value, which is stored inside a backend script. It is used to set the default values for the cake generation form and serves as a fallback when the cake data has invalid values.
* All toppings are generated at once, but only 1 is shown at a time.
* The 3D candles are regenerated every time the user changes the recipient's age by stacking thin layers of identical text on top of each other.
* Users' cake data is stored in MongoDB.

## Optimizations
* When user changes the cake recipient's age, some 3D boxes are redrawn to regenerate the candle's flames. 
However, the cake icing and base are not rendered again. 
* I also used voxel art style to reduce the number of DOM elements (more than 500 DOM elements shown at once cause FPS to drop considerably).

## Lessons Learned:
* Gained solid experience in ExpressJS, MongoDB, Webpack.
* Learned the technique to generate real 3D text through the use of multiple text layers stacked on top of each other.
* Reviewed advanced CSS techniques like CSS variables, CSS calculations, and 3D CSS transforms.
* Reviewed advanced JS concepts like event delegation.
* Practiced dynamic HTML generation with EJS templates.

## Note:
* This is an experimental app to showcase advanced CSS. Due to performance constraints of CSS rendering, this app is not meant for production use.