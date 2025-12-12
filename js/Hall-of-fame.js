gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.divSec');

if (window.screen.width >= 1000) {
    sections.forEach((divsec, index) => {
        
        const boxL = divsec.querySelector('.boxL'); //div gauche avec imgage + texte
        const boxR = divsec.querySelector('.boxR'); //div droite avec imgage + texte

        if (!boxL || !boxR) return;
        const tl = gsap.timeline();

        gsap.set([boxL, boxR], {scale: 0.5,}); //met la taille initiale a 0.5 avant qu'on les voit
        gsap.set(boxL, {x: -100}); //decale a gauche hors ecran
        gsap.set(boxR, {x: 100}); //decale a droite hors ecran

        // Première séquence : 
        tl.to(boxL, {
            opacity: 1,
            duration: 0.2 
        });
        tl.to(boxR, {
            opacity: 1,
            duration: 0.2
        }, '<'); // '<' Commence en meme temps que la precedente

        // Deuxième séquence : 

        tl.to(boxL, {
            opacity: 1,
            x: -200,
            scale: 0.8,
            duration: 0.2    
        });
        tl.to(boxR, {
            opacity: 1,
            x: 200,
            scale: 0.8,
            duration: 0.2
        }, '<'); 

        //troisieme sequece

        tl.to(boxL, {
            opacity: 1,
            x: -350,
            scale: 1.3,
            duration: 0.2 
        });
        tl.to(boxR, {
            opacity: 1,
            x: 350,
            scale: 1.3,
            duration: 0.2
        }, '<'); 

        // quartieme sequece :

        tl.to(boxL, {
            duration: 0.2
        });
        tl.to(boxR, {
            duration: 0.2
        }, '<');

        // cinquieme sequece : 

        tl.to(boxL, {
            opacity: 0,
            x: -1000,
            scale: 2,
            duration: 0.2 
        });
        tl.to(boxR, {
            opacity: 0,
            x: 1000,
            scale: 2,
            duration: 0.2
        }, '<'); 

        ScrollTrigger.create({
            // On creer l'evenement de scoll qu'on relie a la timeline au dessus
            
            animation: tl, 
            
            trigger: divsec, //zone de scroll qu'on regarde pour declencher l'animation
            start: "top top", // debute quand le haut de la section atteint le haut de la fenetre
            end: "bottom top", //termine quand le bas de la section atteint le haut de la fenetre
   
            scrub: 1, 
    

        });
    });

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
}
