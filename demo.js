/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // from http://www.quirksmode.org/js/events_properties.html#position
    const getMousePos = (e) => {
            let posx = 0;
            let posy = 0;
            if (!e) e = window.event;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return { x: posx, y: posy }
        }
        // Generate a random float.
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    /**
     * One class per effect. 
     * Lots of code is repeated, so that single effects can be easily used. 
     */


    // Effect 2
    class HoverImgFx2 {
        constructor(el) {
            this.DOM = { el: el };
            this.DOM.reveal = document.createElement('div');
            this.DOM.reveal.className = 'hover-reveal';
            this.DOM.reveal.style.overflow = 'hidden';
            this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
            this.DOM.el.appendChild(this.DOM.reveal);
            this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
            this.DOM.revealInner.style.overflow = 'hidden';
            this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
            charming(this.DOM.el);
            this.DOM.letters = Array.from(this.DOM.el.querySelectorAll('span'));
            this.initEvents();
        }
        initEvents() {
            this.positionElement = (ev) => {
                const mousePos = getMousePos(ev);
                const docScrolls = {
                    left: document.body.scrollLeft + document.documentElement.scrollLeft,
                    top: document.body.scrollTop + document.documentElement.scrollTop
                };
                this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
                this.DOM.reveal.style.left = `${mousePos.x+20-docScrolls.left}px`;
            };
            this.mouseenterFn = (ev) => {
                this.positionElement(ev);
                this.showImage();
                this.animateLetters();
            };
            this.mousemoveFn = ev => requestAnimationFrame(() => {
                this.positionElement(ev);
            });
            this.mouseleaveFn = () => {
                this.hideImage();
            };

            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        showImage() {
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealImg);

            this.tl = new TimelineMax({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        TweenMax.set(this.DOM.el, { zIndex: 1000 });
                    }
                })
                .add('begin')
                .set([this.DOM.revealInner, this.DOM.revealImg], { transformOrigin: '50% 100%' })
                .add(new TweenMax(this.DOM.revealInner, 0.4, {
                    ease: Expo.easeOut,
                    startAt: { x: '50%', y: '120%', rotation: 50 },
                    x: '0%',
                    y: '0%',
                    rotation: 0
                }), 'begin')
                .add(new TweenMax(this.DOM.revealImg, 0.4, {
                    ease: Expo.easeOut,
                    startAt: { x: '-50%', y: '-120%', rotation: -50 },
                    x: '0%',
                    y: '0%',
                    rotation: 0
                }), 'begin')
                .add(new TweenMax(this.DOM.revealImg, 0.7, {
                    ease: Expo.easeOut,
                    startAt: { scale: 2 },
                    scale: 1
                }), 'begin');
        }
        hideImage() {
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealImg);

            this.tl = new TimelineMax({
                    onStart: () => {
                        TweenMax.set(this.DOM.el, { zIndex: 999 });
                    },
                    onComplete: () => {
                        TweenMax.set(this.DOM.el, { zIndex: '' });
                        TweenMax.set(this.DOM.reveal, { opacity: 0 });
                    }
                })
                .add('begin')
                //.set([this.DOM.revealInner, this.DOM.revealImg], {transformOrigin: '50% 0%'})
                .add(new TweenMax(this.DOM.revealInner, 0.6, {
                    ease: Expo.easeOut,
                    y: '-120%',
                    rotation: -5
                }), 'begin')
                .add(new TweenMax(this.DOM.revealImg, 0.6, {
                    ease: Expo.easeOut,
                    y: '120%',
                    rotation: 5,
                    scale: 1.2
                }), 'begin')
        }
        animateLetters() {
            this.DOM.letters.forEach((letter, pos) => {
                TweenMax.set(letter, { opacity: 0 });
                const delay = pos * 2 / 100;
                TweenMax.to(letter, pos * 0.07 + 0.2, {
                    ease: Expo.easeOut,
                    delay: delay,
                    startAt: { x: '100%' },
                    x: '0%',
                    opacity: 1
                });
            });
        }
    }

    class HoverImgFx5 {
        constructor(el) {
            this.DOM = { el: el };

            this.DOM.reveal = document.createElement('div');
            this.DOM.reveal.className = 'hover-reveal';
            this.DOM.reveal.style.overflow = 'hidden';
            this.DOM.reveal.innerHTML = `<div class="hover-reveal__deco"></div><div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
            this.DOM.el.appendChild(this.DOM.reveal);
            this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
            this.DOM.revealInner.style.overflow = 'hidden';
            this.DOM.revealDeco = this.DOM.reveal.querySelector('.hover-reveal__deco');
            this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

            this.initEvents();
        }
        initEvents() {
            this.positionElement = (ev) => {
                const mousePos = getMousePos(ev);
                const docScrolls = {
                    left: document.body.scrollLeft + document.documentElement.scrollLeft,
                    top: document.body.scrollTop + document.documentElement.scrollTop
                };
                this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
                this.DOM.reveal.style.left = `${mousePos.x+20-docScrolls.left}px`;
            };
            this.mouseenterFn = (ev) => {
                this.positionElement(ev);
                this.showImage();
            };
            this.mousemoveFn = ev => requestAnimationFrame(() => {
                this.positionElement(ev);
            });
            this.mouseleaveFn = () => {
                this.hideImage();
            };

            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        showImage() {
            TweenMax.killTweensOf(this.DOM.reveal);
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealImg);
            TweenMax.killTweensOf(this.DOM.revealDeco);

            this.tl = new TimelineMax({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        TweenMax.set(this.DOM.el, { zIndex: 1000 });
                    }
                })
                .add('begin')
                .set(this.DOM.revealInner, { x: '100%' })
                .set(this.DOM.revealDeco, { transformOrigin: '100% 50%' })
                .add(new TweenMax(this.DOM.revealDeco, 0.3, {
                    ease: Sine.easeInOut,
                    startAt: { scaleX: 0 },
                    scaleX: 1
                }), 'begin')
                .set(this.DOM.revealDeco, { transformOrigin: '0% 50%' })
                .add(new TweenMax(this.DOM.revealDeco, 0.6, {
                    ease: Expo.easeOut,
                    scaleX: 0
                }), 'begin+=0.3')
                .add(new TweenMax(this.DOM.revealInner, 0.6, {
                    ease: Expo.easeOut,
                    startAt: { x: '100%' },
                    x: '0%'
                }), 'begin+=0.45')
                .add(new TweenMax(this.DOM.revealImg, 0.6, {
                    ease: Expo.easeOut,
                    startAt: { x: '-100%' },
                    x: '0%'
                }), 'begin+=0.45')
                .add(new TweenMax(this.DOM.revealImg, 1.6, {
                    ease: Expo.easeOut,
                    startAt: { scale: 1.3 },
                    scale: 1
                }), 'begin+=0.45')
                .add(new TweenMax(this.DOM.reveal, 0.8, {
                    ease: Quint.easeOut,
                    startAt: { x: '20%', rotation: 10 },
                    x: '0%',
                    rotation: 0
                }), 'begin');
        }
        hideImage() {
            TweenMax.killTweensOf(this.DOM.reveal);
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealImg);
            TweenMax.killTweensOf(this.DOM.revealDeco);

            this.tl = new TimelineMax({
                    onStart: () => {
                        TweenMax.set(this.DOM.el, { zIndex: 999 });
                    },
                    onComplete: () => {
                        TweenMax.set(this.DOM.el, { zIndex: '' });
                        TweenMax.set(this.DOM.reveal, { opacity: 0 });
                    }
                })
                .add('begin')
                .add(new TweenMax(this.DOM.revealInner, 0.1, {
                    ease: Sine.easeOut,
                    x: '-100%'
                }), 'begin')
                .add(new TweenMax(this.DOM.revealImg, 0.1, {
                    ease: Sine.easeOut,
                    x: '100%'
                }), 'begin')
        }
    }



    Array.from(document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')).forEach(link => new HoverImgFx1(link));
    Array.from(document.querySelectorAll('[data-fx="2"] > a, a[data-fx="2"]')).forEach(link => new HoverImgFx2(link));
    Array.from(document.querySelectorAll('[data-fx="3"] > a, a[data-fx="3"]')).forEach(link => new HoverImgFx3(link));
    Array.from(document.querySelectorAll('[data-fx="4"] > a, a[data-fx="4"]')).forEach(link => new HoverImgFx4(link));
    Array.from(document.querySelectorAll('[data-fx="5"] > a, a[data-fx="5"]')).forEach(link => new HoverImgFx5(link));
    Array.from(document.querySelectorAll('[data-fx="6"] > a, a[data-fx="6"]')).forEach(link => new HoverImgFx6(link));
    Array.from(document.querySelectorAll('[data-fx="7"] > a, a[data-fx="7"]')).forEach(link => new HoverImgFx7(link));
    Array.from(document.querySelectorAll('[data-fx="8"] > a, a[data-fx="8"]')).forEach(link => new HoverImgFx8(link));
    Array.from(document.querySelectorAll('[data-fx="9"] > a, a[data-fx="9"]')).forEach(link => new HoverImgFx9(link));
    Array.from(document.querySelectorAll('[data-fx="10"] > a, a[data-fx="10"]')).forEach(link => new HoverImgFx10(link));
    Array.from(document.querySelectorAll('[data-fx="11"] > a, a[data-fx="11"]')).forEach(link => new HoverImgFx11(link));


    // // Demo purspose only: Preload all the images in the page..
    // const contentel = document.querySelector('.content');
    // Array.from(document.querySelectorAll('.block__title, .block__link, .content__text-link')).forEach((el) => {
    //     const imgsArr = el.dataset.img.split(',');
    //     for (let i = 0, len = imgsArr.length; i <= len-1; ++i ) {
    //         const imgel = document.createElement('img');
    //         imgel.style.visibility = 'hidden';
    //         imgel.style.width = 0;
    //         imgel.src = imgsArr[i];
    //         imgel.className = 'preload';
    //         contentel.appendChild(imgel);
    //     }
    // });
    // imagesLoaded(document.querySelectorAll('.preload'), () => document.body.classList.remove('loading'));
}