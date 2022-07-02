/* Credit: https://keithclark.co.uk/ */

import Vect3 from "./vect3";

function computeVertexData (elem) {
    let w = elem.offsetWidth / 2,
        h = elem.offsetHeight / 2,
        v = {
            a: { x: -w, y: -h, z: 0 },
            b: { x: w, y: -h, z: 0 },
            c: { x: w, y: h, z: 0 },
            d: { x: -w, y: h, z: 0 }
        },
        transform;

    // Walk up the DOM and apply parent element transforms to each vertex
    while (elem.nodeType === 1) {
        transform = getTransform(elem);
        v.a = Vect3.add(Vect3.rotate(v.a, transform.rotate), transform.translate);
        v.b = Vect3.add(Vect3.rotate(v.b, transform.rotate), transform.translate);
        v.c = Vect3.add(Vect3.rotate(v.c, transform.rotate), transform.translate);
        v.d = Vect3.add(Vect3.rotate(v.d, transform.rotate), transform.translate);
        elem = elem.parentNode;
    }
    return v;
}

function parseMatrix(matrixString) {
    let c = matrixString.split(/\s*[(),]\s*/).slice(1, -1),
        matrix;
    if (c.length === 6) {
        // 'matrix()' (3x2)
        matrix = {
            m11: +c[0], m21: +c[2], m31: 0, m41: +c[4],
            m12: +c[1], m22: +c[3], m32: 0, m42: +c[5],
            m13: 0, m23: 0, m33: 1, m43: 0,
            m14: 0, m24: 0, m34: 0, m44: 1
        };
    } else if (c.length === 16) {
        // matrix3d() (4x4)
        matrix = {
            m11: +c[0], m21: +c[4], m31: +c[8], m41: +c[12],
            m12: +c[1], m22: +c[5], m32: +c[9], m42: +c[13],
            m13: +c[2], m23: +c[6], m33: +c[10], m43: +c[14],
            m14: +c[3], m24: +c[7], m34: +c[11], m44: +c[15]
        };
    } else {
        // handle 'none' or invalid values.
        matrix = {
            m11: 1, m21: 0, m31: 0, m41: 0,
            m12: 0, m22: 1, m32: 0, m42: 0,
            m13: 0, m23: 0, m33: 1, m43: 0,
            m14: 0, m24: 0, m34: 0, m44: 1
        };
    }
    return matrix;
}

function getTransform(elem) {
    let matrix = parseMatrix(getComputedStyle(elem, null).transform),
        rotateY = Math.asin(-matrix.m13),
        rotateX,
        rotateZ;

    if (Math.cos(rotateY) !== 0) {
        rotateX = Math.atan2(matrix.m23, matrix.m33);
        rotateZ = Math.atan2(matrix.m12, matrix.m11);
    } else {
        rotateX = Math.atan2(-matrix.m31, matrix.m22);
        rotateZ = 0;
    }
    return {
        rotate: {x: rotateX, y: rotateY, z: rotateZ},
        translate: {x: matrix.m41, y: matrix.m42, z: matrix.m43}
    };
}


function createTestPoints(parent, element) {
    for (let key of "abcd") {
        const newPoint = document.createElement("div");
        newPoint.classList.add("testPoint");
        parent.append(newPoint);
        window.addEventListener("mousemove", function() {
            const vertexData = computeVertexData(element);
            const coordinate = vertexData[key];
            const coordString = `translate3d(${Math.round(coordinate.x)}px, ${Math.round(coordinate.y)}px, ${Math.round(coordinate.z)}px)`;
            console.log(coordString);
            newPoint.style.transform = coordString;
        })
    }
}

let light = document.querySelector(".globalLight");
let faces = Array.from(document.querySelectorAll("._lighting"));
light.style.transform = "translate3d(0, -500px, 2000px)";
let lightPosition = getTransform(light).translate;

createTestPoints(document.querySelector(".canvas"), document.querySelector(".cakeText"));

window.addEventListener("mousemove", function() {



    // faces.forEach(function (face, i) {
    //     let vertices = computeVertexData(face),
    //         faceCenter = Vect3.divs(Vect3.sub(vertices.c, vertices.a), 2),
    //         faceNormal = Vect3.normalize(Vect3.cross(Vect3.sub(vertices.b, vertices.a), Vect3.sub(vertices.c, vertices.a))),
    //         direction = Vect3.normalize(Vect3.sub(lightPosition, faceCenter)),
    //         amount = 1 - Math.max(0, Vect3.dot(faceNormal, direction)).toFixed(3);
    //     // console.log(amount);
    //
    //     face.style.backgroundImage = "linear-gradient(rgba(0,0,0," + amount + "), rgba(0,0,0," + amount + "))";
    // });
});