---
layout: post
title: Idea Slot Machine
description: I vibe-coded a slot machine to generate project ideas.
date: 2025-03-27 15:00 +0530
image: "/assets/images/idea-slot-machine/preview.png"
show_full_post_on_homepage: true
---

I vibe-coded a slot machine to generate project ideas.

I may update the list of technologies here over time.

If you want to build your own idea generating slot machine, you can copy and edit the source code of this page (or ask an LLM to do it for you 🙂).

<!-- START LLM-GENERATED CODE -->
<style>
    .container {
        max-width: 500px;
        margin: 0;
        padding: 20px;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
    }
    .slot-machine {
        background-color: #5d6d7e;
        border-radius: 10px;
        padding: 20px;
        max-width: 450px;
        margin: 0 auto;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        padding-bottom: 30px;
    }
    .machine-container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 30px;
    }
    .slot-section {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .slots {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .slot {
        width: 120px;
        height: 120px;
        background-color: white;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    }
    .slot-wrapper {
        position: absolute;
        width: 100%;
        transition: transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95);
    }
    .slot-item {
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
    }
    @media (max-width: 480px) {
        .slot {
            width: 100px;
            height: 100px;
        }
        .slot-item {
            width: 100px;
            height: 100px;
        }
        .slots {
            gap: 10px;
        }
        .machine-container {
            gap: 15px;
        }
        h1 {
            font-size: 24px;
        }
        #combination-text {
            font-size: 16px;
        }
        .combination-result {
            max-width: 190px;
        }
    }
    .slot-item img {
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
    }
    .lever-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 170px;
    }
    .lever {
        position: relative;
        height: 150px;
        width: 40px;
        cursor: pointer;
    }
    .lever-handle {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        background-color: #e74c3c;
        border-radius: 50%;
        z-index: 2;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
    }
    .lever-base {
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 120px;
        background-color: #7f8c8d;
        border-radius: 5px;
        z-index: 1;
    }
    .lever:hover .lever-handle {
        background-color: #c0392b;
    }
    .lever.disabled {
        cursor: not-allowed;
    }
    .lever.disabled .lever-handle {
        background-color: #95a5a6;
    }
    .lever.pulled .lever-handle {
        transform: translateX(-50%) translateY(100px);
    }
    .combination-result {
        background-color: #f5f5f5;
        border-radius: 5px;
        padding: 12px;
        margin-top: 15px;
        width: 100%;
        text-align: center;
        max-width: 240px;
    }
    #combination-text {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        color: #2c3e50;
    }
</style>
<center>
<div class="container">
    <div class="slot-machine">
        <div class="machine-container">
            <div class="slot-section">
                <div class="slots">
                    <div class="slot" id="slot1">
                        <div class="slot-wrapper"></div>
                    </div>
                    <div class="slot" id="slot2">
                        <div class="slot-wrapper"></div>
                    </div>
                </div>
                <div class="combination-result">
                    <p id="combination-text">Pull the lever</p>
                </div>
            </div>
            <div class="lever-container">
                <div class="lever" id="spin-lever">
                    <div class="lever-handle"></div>
                    <div class="lever-base"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</center>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        let currentIndex1 = 0;
        let currentIndex2 = 0;
        let isDragging = false;
        let startY = 0;
        let leverPulled = false;
        
        const technologies = [
            { name: 'LLMs', image: '/assets/images/idea-slot-machine/llm.png' },
            { name: 'eBPF', image: '/assets/images/idea-slot-machine/ebpf.avif' },
            { name: 'Kubernetes', image: '/assets/images/idea-slot-machine/kubernetes.png' },
            { name: 'OpenTelemetry', image: '/assets/images/idea-slot-machine/opentelemetry.png' },
            { name: 'ZAP', image: '/assets/images/idea-slot-machine/zap.png' },
        ];

        const slot1El = document.getElementById('slot1').querySelector('.slot-wrapper');
        const slot2El = document.getElementById('slot2').querySelector('.slot-wrapper');
        const spinLever = document.getElementById('spin-lever');
        const leverHandle = spinLever.querySelector('.lever-handle');
        const combinationText = document.getElementById('combination-text');

        function initializeSlots() {
            technologies.forEach(tech => {
                const slotItem1 = createSlotItem(tech);
                const slotItem2 = createSlotItem(tech);
                
                slot1El.appendChild(slotItem1);
                slot2El.appendChild(slotItem2);
            });

            for (let i = 0; i < 3; i++) {
                const clone1 = slot1El.children[i].cloneNode(true);
                const clone2 = slot2El.children[i].cloneNode(true);
                slot1El.appendChild(clone1);
                slot2El.appendChild(clone2);
            }

            resetSlotPosition(slot1El);
            resetSlotPosition(slot2El);
        }

        function createSlotItem(tech) {
            const slotItem = document.createElement('div');
            slotItem.className = 'slot-item';
            slotItem.dataset.name = tech.name;
            
            const img = document.createElement('img');
            img.src = tech.image;
            img.alt = tech.name;
            
            slotItem.appendChild(img);
            return slotItem;
        }

        function resetSlotPosition(slotEl) {
            slotEl.style.transform = 'translateY(0)';
        }

        function spin() {
            spinLever.classList.add('disabled');
            spinLever.classList.add('pulled');
            leverHandle.style.transform = 'translateX(-50%) translateY(100px)';
            
            let randomIndex1;
            let randomIndex2;
            
            do {
                randomIndex1 = Math.floor(Math.random() * technologies.length);
            } while (randomIndex1 === currentIndex1);
            
            do {
                randomIndex2 = Math.floor(Math.random() * technologies.length);
            } while (randomIndex2 === currentIndex2 || randomIndex2 === randomIndex1);
            
            currentIndex1 = randomIndex1;
            currentIndex2 = randomIndex2;
            
            // Get the actual slot item height based on current viewport
            const slotItemHeight = slot1El.querySelector('.slot-item').offsetHeight;
            const finalPosition1 = -(randomIndex1 * slotItemHeight);
            const finalPosition2 = -(randomIndex2 * slotItemHeight);
            
            slot1El.style.transition = 'transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
            slot2El.style.transition = 'transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
            
            slot1El.style.transform = `translateY(${finalPosition1}px)`;
            slot2El.style.transform = `translateY(${finalPosition2}px)`;
            
            setTimeout(() => {
                // Reset lever position visually
                spinLever.classList.remove('pulled');
                leverHandle.style.transform = 'translateX(-50%) translateY(0)';
                spinLever.classList.remove('disabled');
                
                const tech1 = technologies[randomIndex1].name;
                const tech2 = technologies[randomIndex2].name;
                combinationText.textContent = `${tech1} × ${tech2}`;
            }, 500);
        }

        // Mouse drag events for the lever
        leverHandle.addEventListener('mousedown', function(e) {
            if (!spinLever.classList.contains('disabled')) {
                isDragging = true;
                startY = e.clientY;
                document.body.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });

        // Touch events for mobile
        spinLever.addEventListener('touchstart', function(e) {
            if (!this.classList.contains('disabled')) {
                isDragging = true;
                startY = e.touches[0].clientY;
                e.preventDefault();
                
                // Detect if this is a tap (will be cancelled if it becomes a drag)
                this.isTap = true;
            }
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging && !spinLever.classList.contains('disabled')) {
                const deltaY = e.clientY - startY;
                const maxPull = 100; // Maximum pull distance
                
                // Limit the pull to the maximum distance
                const pullDistance = Math.min(Math.max(deltaY, 0), maxPull);
                
                // Apply the transform to the lever handle
                leverHandle.style.transform = `translateX(-50%) translateY(${pullDistance}px)`;
                
                // If pulled more than 70% of the way, trigger the spin
                if (pullDistance >= maxPull * 0.7 && !leverPulled) {
                    leverPulled = true;
                    spin();
                }
            }
        });
        
        document.addEventListener('touchmove', function(e) {
            if (isDragging && !spinLever.classList.contains('disabled')) {
                // If movement detected, this is not a tap
                spinLever.isTap = false;
                
                const deltaY = e.touches[0].clientY - startY;
                const maxPull = 100; // Maximum pull distance
                
                // Limit the pull to the maximum distance
                const pullDistance = Math.min(Math.max(deltaY, 0), maxPull);
                
                // Apply the transform to the lever handle
                leverHandle.style.transform = `translateX(-50%) translateY(${pullDistance}px)`;
                
                // If pulled more than 70% of the way, trigger the spin
                if (pullDistance >= maxPull * 0.7 && !leverPulled) {
                    leverPulled = true;
                    spin();
                }
                
                e.preventDefault(); // Prevent scrolling while dragging
            }
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                leverPulled = false;
                document.body.style.cursor = 'default';
                
                // If not already in a spin animation, reset the lever position
                if (!spinLever.classList.contains('pulled') && !spinLever.classList.contains('disabled')) {
                    leverHandle.style.transform = 'translateX(-50%) translateY(0)'; 
                }
            }
        });
        
        document.addEventListener('touchend', function(e) {
            if (isDragging) {
                // Check if this was a tap (no movement detected)
                if (spinLever.isTap && !spinLever.classList.contains('disabled')) {
                    spin();
                }
                
                isDragging = false;
                leverPulled = false;
                spinLever.isTap = false;
                
                // If not already in a spin animation, reset the lever position
                if (!spinLever.classList.contains('pulled') && !spinLever.classList.contains('disabled')) {
                    leverHandle.style.transform = 'translateX(-50%) translateY(0)'; 
                }
            }
        });

        // Keep the click event for easier use
        spinLever.addEventListener('click', function() {
            if (!this.classList.contains('disabled') && !isDragging) {
                spin();
            }
        });

        initializeSlots();
    });
</script>

<!-- END LLM-GENERATED CODE -->

<br>

<details>
<summary> Fine print </summary>
<p>Disclaimer: The logos used in this project are the trademarks of their respective owners. This project is for informational purposes only and is not affiliated with or endorsed by any of the companies or organizations represented.
<p>Attribution:
<ul>
<li>LLM Logo: Sparkles emoji from <a href="https://github.com/twitter/twemoji">Twemoji</a></li>
</ul>
