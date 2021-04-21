function checkCollision(thePlane, theCoins, theEnemies, theMissiles, score, health) {

    if (thePlane.model) {

        planeBB = new THREE.Box3().setFromObject(thePlane.model);

        // HANDLING COLLISION 
        var i = theCoins.length;
        while (i--) {
            if (theCoins[i]) {
                coinBB = new THREE.Box3().setFromObject(theCoins[i].model);
                if (planeBB.intersectsBox(coinBB)) {
                    score += 1;
                    theCoins[i].destroy();
                    theCoins.splice(i, 1);
                    document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
                } 
            }
        }

        var i = theEnemies.length;
        while (i--) {
            if (theEnemies[i]) {
                enemyBB = new THREE.Box3().setFromObject(theEnemies[i].model);

                if (planeBB.intersectsBox(enemyBB)) {
                    health -= 1;
                    theEnemies[i].destroy();
                    theEnemies.splice(i, 1);
                    document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
                }
            }

            var j = theMissiles.length;
            while (j--) {
                if (theMissiles[j]) {
                    missileBB = new THREE.Box3().setFromObject(theMissiles[j].model);
                    if (missileBB.intersectsBox(enemyBB)) {
                        score += 2;
                        theEnemies[i].destroy();
                        theEnemies.splice(i, 1);
                        theMissiles[j].destroy();
                        theMissiles.splice(j, 1);
                        document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score; 
                    } 
                }
            }
        }
    }

    return [theCoins, theEnemies, theMissiles, score, health];

}