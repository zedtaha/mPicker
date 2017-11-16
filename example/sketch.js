/**
 * Example code to demonstrate use of the mPicker.js picker functions.
 *
 * Ensure that the mPicker.js file with correct path is included in index.html
 */

var kitten;
var puppy;
var cameraX = 0, cameraY = 0, cameraZ = 0;

// Define some variable names to use as object IDs
const BOX1=101;
const CONE1=102;
const PLANE1=103;
const SPHERE1=104;
const TORUS1=105;

const CLICKBOX=128;
const CLICKPLANE=129;


function preload() {
	kitten = loadImage('kitten.jpg');
    puppy = loadImage('puppy.jpg');
}

function setup() {
	mCreateCanvas(800, 600, WEBGL);
}

function draw() {
    mBackground(0);
	mResetMatrix(); // Always include mResetMatrix to ensure proper operation of the object picker.
    
    adjustCamera();
    mCamera(cameraX, cameraY, cameraZ);
    
    // Continually rotate the entire 3D space
	mRotateY(frameCount * 0.01);
	mRotateX(frameCount * 0.01);

    // Draw a box that is clickable to spawn new boxes
    mPush();
    mTranslate(50,50,50);
    mRotateZ(frameCount * 0.01);
    mTexture(kitten);
    mBox(BOX1, 100);
    mPop();
    
    // Draw a plane that is clickable to change its texture image
    mPush();
    mTranslate(150,150,150);
    mRotateX(frameCount * 0.02);
    mTexture(kitten);
    mPlane(PLANE1, 100);
    mPop();
    
    // Draw a cone that changes texture image when hovered over with the mouse
    mPush();
    mTranslate(-50,-50,-50);
    mRotateZ(frameCount * -0.03);
    mCone(CONE1, 100);
    mTexture(getObjectID(mouseX, mouseY)==CONE1 ? puppy : kitten);
    mCone(CONE1, 100);
    mPop();
    
    // Draw a sphere that changes texture image when hovered over with a mouse
    mPush();
    mTranslate(0,-200,-50);
    mSphere(SPHERE1, 100);
    mTexture(getObjectID(mouseX, mouseY)==SPHERE1 ? puppy : kitten);
    mSphere(SPHERE1, 100);
    mPop();
    
    if(mouseIsPressed) {
        var objectID = getObjectID(mouseX, mouseY);
    
        switch(objectID) {
            case BOX1:  // Spawn a set of boxes when clicked
                for(var i=0; i<10; i++) {
                    mPush();
                    mTranslate(0,0,(i-5)*50);
                    mRotateZ(frameCount * 0.01);
                    mTexture(puppy);
                    mBox(CLICKBOX, 30);
                    mPop();
                }
                break;
            case PLANE1:  // Change the texture image when clicked
                mPush();
                mTranslate(150,150,150);
                mRotateX(frameCount * 0.02);
                mTexture(puppy);
                mPlane(CLICKPLANE, 100);
                mPop();
                break;
        }
    }
}

function adjustCamera() {
    if (keyIsDown(UP_ARROW)) {
        cameraZ -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        cameraZ += 10;
    }
    if (keyIsDown(LEFT_ARROW)) {
        cameraX -= 10;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        cameraX += 10;
    }
}