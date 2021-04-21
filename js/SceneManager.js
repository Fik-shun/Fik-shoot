function SceneManager(canvas) {

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    
    var keyMap = [];

    var thePlane, theSkybox, theCoins, theEnemies;
    const dynamicSubjects = createSceneSubjects(scene);
    const theMissiles = [];

    var ambientLight = new THREE.AmbientLight('#ffffff', 1.5)
    scene.add(ambientLight)

    var score = 0;
    var health = 3;
    var gameEnded = false;

    function buildScene() {
        const scene = new THREE.Scene();

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 

        renderer.setClearColor("#222222") 
        renderer.setSize(width, height);

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        // const fieldOfView = 75;
        const nearPlane = 1;
        const farPlane = 1000; 
        const camera = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, nearPlane, farPlane);
        
        camera.position.z = 10;

        return camera;
    }

    function createSceneSubjects(scene) {
        thePlane = new Plane(scene);
        theBackground = new Background(scene);
        theCoins = placeCoins(scene);
        theEnemies = placeEnemies(scene);

        const dynSubjs = [ thePlane ];

        return dynSubjs;
    }

    this.update = function() {

        if (camera.position.y < 2000 && health > 0) {
            camera.position.y += 1;

            for(let i=0; i<dynamicSubjects.length; i++)
            	dynamicSubjects[i].update();

            var i = theCoins.length;
            while (i--) {
                if (checkCollision(thePlane, theCoins[i])) {
                    score += 1;
                    theCoins[i].destroy();
                    theCoins.splice(i, 1);
                    document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
                } 
            }


            var i = theEnemies.length;
            while (i--) {

                if (checkCollision(thePlane, theEnemies[i])) {
                    health -= 1;
                    theEnemies[i].destroy();
                    theEnemies.splice(i, 1);
                    document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
                }

                var j = theMissiles.length;
                while (j--) {
                    if (checkCollision(theMissiles[j], theEnemies[i])) {
                        score += 2;
                        theEnemies[i].destroy();
                        theEnemies.splice(i, 1);
                        theMissiles[j].destroy();
                        theMissiles.splice(j, 1);
                        document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
                    } 
                }
            }

            renderer.render(scene, camera);


            thePlane.handleInput(keyMap, camera);
            if (keyMap[32]) {
                const m = thePlane.launchMissile();
                dynamicSubjects.push(m);
                theMissiles.push(m);
                keyMap[32] = false;
            }


        }
        else if (!gameEnded) {
            gameEnded = true;
            document.getElementById("gameover").innerHTML = "GAME OVER"; 
        }
    }

    function checkCollision(m1, m2) {

        if (m1.model && m2.model) {
            minX1 = m1.model.position.x - (m1.width/2);
            maxX1 = m1.model.position.x + (m1.width/2);
            minY1 = m1.model.position.y - (m1.height/2);
            maxY1 = m1.model.position.y + (m1.height/2);

            minX2 = m2.model.position.x - (m2.width/2);
            maxX2 = m2.model.position.x + (m2.width/2);
            minY2 = m2.model.position.y - (m2.height/2);
            maxY2 = m2.model.position.y + (m2.height/2);

            if (minX1 <= maxX2 && maxX1 >= minX2 && minY1 <= maxY2 && maxY1 >= minY2)
                return true;
            else
                return false;
        }
        else
            return false;

    } 

    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        renderer.setSize(width, height);

        camera.left = -width / 2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = -height / 2;
        camera.updateProjectionMatrix();

    }

    this.handleInput = function(keyCode, isDown) {

        keyMap[keyCode] = isDown;
    }
}