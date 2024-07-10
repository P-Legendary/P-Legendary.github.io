var htmlBody= document.querySelector("html");
        var nodeBlocks = document.querySelectorAll(".blocks");
        var containerBlock = document.getElementById("container");
        var easyNode = document.getElementById("easy");
        var hardNode = document.getElementById("hard");
        var playNode = document.getElementById("play");
        var score = document.getElementById("score");
        var cog= document.getElementById("cog");
        var hits = 0;
        const  hammerSound= new Audio("hammersound.mp3");
        const iliDutu= [new Audio("ili.mp3"),  new Audio("dutu.mp3")]; //implemented
        const peek= new Audio("peekaboo.mp3"); // implemented
        peek.volume= 1; // it was loudly annoying had to turn it down...
        const airhorn= new Audio("airhorn.mp3");
        const emmy= new Audio("emmytulipanga.mp3"); // implemented
        const kwaBifeti= new Audio("kwa Bifeti.mp3");
        const wazeWazee= new Audio("wazewazee.mp3");
        

        cog.addEventListener("click", ()=>{
            document.getElementById("menu").classList.toggle("show");
            wazeWazee.play();
        });
        easyNode.addEventListener("click", function() {
            hardNode.classList.add("hide");
            easyNode.classList.add("hide");
            showMoleEasy();
        });

        hardNode.addEventListener("click", function() {
            hardNode.classList.add("hide");
            easyNode.classList.add("hide");
            showMoleHard();
            
        });

        playNode.addEventListener("click", function() {
            hardNode.style.display = "block";
            easyNode.style.display = "block";
            playNode.classList.add("hide");
            emmy.play();
            peek.play();
        });

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function showMoleHard() {
            var indexedNode = getRandomBlock();
            indexedNode.classList.add("show-mole-hard");
            peek.play();

            setTimeout(() => {
                indexedNode.classList.remove("show-mole-hard");
                setTimeout(showMoleHard, getRandomInt(100, 1000));
            }, 250);
        }

        function showMoleEasy() {
            var indexedNode = getRandomBlock();
            indexedNode.classList.add("show-mole-easy");
            peek.play();

            setTimeout(() => {
                indexedNode.classList.remove("show-mole-easy");
                setTimeout(showMoleEasy, getRandomInt(1000, 3000));
            }, 1000);
        }

        function getRandomBlock() {
            var randomIndex = getRandomInt(0, nodeBlocks.length - 1);
            return nodeBlocks[randomIndex];
        }

        for (let i = 0; i < nodeBlocks.length; i++) {
            nodeBlocks[i].addEventListener("click", function() {
                nodeBlocks[i].classList.add("hammer");
                nodeBlocks[i].parentElement.classList.toggle("shake-screen");
                hammerSound.play();
                //containerBlock.classList.toggle("twenty4");
                //containerBlock.style.cssText="background: url(\"pictures/confetti.gif\")";
                setTimeout(() => {
                    this.classList.remove("hammer");
                }, 500);
                if (hits % 5 === 0) {
                    containerBlock.classList.toggle("shake-screen");
                }
                if (this.classList.contains("show-mole-easy") || this.classList.contains("show-mole-hard")) {
                    score.innerText = parseInt(score.innerText) + 1;
                    hits++;
                    iliDutu[getRandomInt(0,iliDutu.length-1)].play();
                    console.log(hits);
                    console.log(iliDutu);
                }
                // when we hit the special nummber//

                if (hits%24==0 & hits!=0){
                    containerBlock.classList.add("twenty4");
                    kwaBifeti.play();
                    setTimeout(() => {
                        airhorn.play();
                        setTimeout(()=>{containerBlock.classList.remove("twenty4");}, 3000);
                    }, 10000);
                    for (let i=0; i<nodeBlocks.length; i++){
                        if (i%2==0)
                            nodeBlocks[i].classList.add("show-mole-easy");
                        else
                            nodeBlocks[i].classList.add("show-mole-hard");
                    }
                    setTimeout(()=>{
                        for (let i=0; i<nodeBlocks.length; i++){
                            if (i%2==0)
                                nodeBlocks[i].classList.remove("show-mole-easy");
                            else
                                nodeBlocks[i].classList.remove("show-mole-hard");
                        
                        }
                    }, 10000);
                    
                    alert(alert("🎉🎉🎉 Makorokoto Murume 🎉🎉🎉"));
                }
                
            });
        }