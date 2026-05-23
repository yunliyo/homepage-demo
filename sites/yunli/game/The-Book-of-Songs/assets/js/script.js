(function () {
    // ==================== Game Config ====================
    const GENRES = [{
            name: '自由诗',
            sub: 'Free Verse',
            color: '#e8d5b7'
        },
        {
            name: '小说',
            sub: 'Novel',
            color: '#e0c8a8'
        },
        {
            name: '元曲',
            sub: 'Yuan Qu',
            color: '#d4b896'
        },
        {
            name: '宋词',
            sub: 'Song Ci',
            color: '#c8a882'
        },
        {
            name: '唐诗',
            sub: 'Tang Poetry',
            color: '#c19a7a'
        },
        {
            name: '古诗',
            sub: 'Old Poetry',
            color: '#b07850'
        },
        {
            name: '骈文辞赋',
            sub: 'Parallel Prose',
            color: '#a0522d'
        },
        {
            name: '散文',
            sub: 'Prose',
            color: '#8b4513'
        },
        {
            name: '应用文',
            sub: 'Practical',
            color: '#6b3410'
        },
        {
            name: '楚辞',
            sub: 'Chu Ci',
            color: '#5a2d0c'
        },
        {
            name: '诗经',
            sub: 'Book of Songs',
            color: '#daa520'
        },
    ];

    const GRID_SIZE = 4;
    const WIN_LEVEL = 10; // 0-indexed, so level 10 = 诗经

    // ==================== Game State ====================
    let grid = [];
    let score = 0;
    let best = 0;
    let won = false;
    let gameOver = false;
    let mergedCells = new Set();
    let newCells = new Set();

    // ==================== DOM Refs ====================
    const boardEl = document.getElementById('board');
    const scoreEl = document.getElementById('score');
    const bestEl = document.getElementById('best');
    const overlay = document.getElementById('overlay');
    const overlayIcon = document.getElementById('overlayIcon');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayMsg = document.getElementById('overlayMsg');
    const particlesEl = document.getElementById('particles');

    // ==================== Init ====================
    function init() {
        grid = Array.from({
            length: GRID_SIZE
        }, () => Array(GRID_SIZE).fill(-1));
        score = 0;
        won = false;
        gameOver = false;
        mergedCells.clear();
        newCells.clear();
        best = parseInt(localStorage.getItem('synthesisShijingBest') || '0');
        updateScore();
        spawnTile();
        spawnTile();
        renderBoard();
        hideOverlay();
    }

    // ==================== Score ====================
    function updateScore() {
        scoreEl.textContent = score;
        if (score > best) {
            best = score;
            localStorage.setItem('synthesisShijingBest', best);
        }
        bestEl.textContent = best;
    }

    function addScore(level) {
        // Score = 2^(level+1) * 10, similar to 2048
        score += Math.pow(2, level + 1) * 5;
        updateScore();
    }

    // ==================== Spawn Tile ====================
    function spawnTile() {
        const emptyCells = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] === -1) emptyCells.push({
                    r,
                    c
                });
            }
        }
        if (emptyCells.length === 0) return false;

        const pos = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        // 90% chance level 0 (自由诗), 10% chance level 1 (小说)
        grid[pos.r][pos.c] = Math.random() < 0.9 ? 0 : 1;
        newCells.add(`${pos.r},${pos.c}`);
        return true;
    }

    // ==================== Render ====================
    function renderBoard() {
        boardEl.innerHTML = '';
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                const key = `${r},${c}`;
                if (newCells.has(key)) cell.classList.add('new-tile');
                if (mergedCells.has(key)) cell.classList.add('merged');

                const level = grid[r][c];
                if (level >= 0) {
                    cell.setAttribute('data-level', level);
                    const genre = GENRES[level];
                    cell.innerHTML = `<span class="tile-text"><span class="genre">${genre.name}</span><span class="sub">${genre.sub}</span></span>`;
                }
                boardEl.appendChild(cell);
            }
        }
        newCells.clear();
        mergedCells.clear();
    }

    // ==================== Move Logic ====================
    // Slide and merge a 1D array toward index 0.
    // Returns { row, mergedPositions } where mergedPositions is array of
    // indices in the result (before padding) where two tiles merged.
    function slideRow(row) {
        const tiles = row.filter(v => v >= 0);
        const result = [];
        const mergedPositions = [];
        let i = 0;
        while (i < tiles.length) {
            if (i < tiles.length - 1 && tiles[i] === tiles[i + 1] && tiles[i] < GENRES.length - 1) {
                result.push(tiles[i] + 1);
                addScore(tiles[i] + 1);
                mergedPositions.push(result.length - 1);
                i += 2;
            } else {
                result.push(tiles[i]);
                i++;
            }
        }
        while (result.length < GRID_SIZE) result.push(-1);
        return {
            row: result,
            mergedPositions
        };
    }

    function move(direction) {
        if (gameOver) return;

        let moved = false;
        mergedCells.clear();
        newCells.clear();

        if (direction === 'left') {
            for (let r = 0; r < GRID_SIZE; r++) {
                const original = [...grid[r]];
                const {
                    row,
                    mergedPositions
                } = slideRow(grid[r]);
                grid[r] = row;
                if (!arraysEqual(original, grid[r])) moved = true;
                mergedPositions.forEach(c => mergedCells.add(`${r},${c}`));
            }
        } else if (direction === 'right') {
            for (let r = 0; r < GRID_SIZE; r++) {
                const original = [...grid[r]];
                const {
                    row,
                    mergedPositions
                } = slideRow([...grid[r]].reverse());
                grid[r] = row.reverse();
                if (!arraysEqual(original, grid[r])) moved = true;
                // mergedPositions are in reversed space → map back
                mergedPositions.forEach(i => mergedCells.add(`${r},${GRID_SIZE - 1 - i}`));
            }
        } else if (direction === 'up') {
            for (let c = 0; c < GRID_SIZE; c++) {
                const col = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
                const original = [...col];
                const {
                    row,
                    mergedPositions
                } = slideRow(col);
                for (let r = 0; r < GRID_SIZE; r++) grid[r][c] = row[r];
                if (!arraysEqual(original, row)) moved = true;
                mergedPositions.forEach(r => mergedCells.add(`${r},${c}`));
            }
        } else if (direction === 'down') {
            for (let c = 0; c < GRID_SIZE; c++) {
                const col = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
                const original = [...col];
                const {
                    row,
                    mergedPositions
                } = slideRow([...col].reverse());
                for (let r = 0; r < GRID_SIZE; r++) grid[r][c] = row[GRID_SIZE - 1 - r];
                if (!arraysEqual(original, col.map((_, i) => grid[i][c]))) moved = true;
                mergedPositions.forEach(i => mergedCells.add(`${GRID_SIZE - 1 - i},${c}`));
            }
        }

        if (moved) {
            spawnTile();
            renderBoard();
            checkWin();
            if (!won && isGameOver()) {
                triggerGameOver();
            }
        }
    }

    function arraysEqual(a, b) {
        return a.length === b.length && a.every((v, i) => v === b[i]);
    }

    // ==================== Win / Lose ====================
    function checkWin() {
        if (won) return;
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] >= WIN_LEVEL) {
                    won = true;
                    triggerWin();
                    return;
                }
            }
        }
    }

    function triggerWin() {
        gameOver = true;
        overlayIcon.textContent = '📜';
        overlayTitle.textContent = '恭喜合成《诗经》！';
        overlayMsg.textContent = '文脉贯通，终成经典！分数：' + score;
        showOverlay();
        spawnParticles();
        if (score > best) {
            best = score;
            localStorage.setItem('synthesisShijingBest', best);
            bestEl.textContent = best;
        }
    }

    function isGameOver() {
        // Check for empty cells
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] === -1) return false;
            }
        }
        // Check for possible merges
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const val = grid[r][c];
                if (val >= GENRES.length - 1) continue;
                // Check right
                if (c < GRID_SIZE - 1 && grid[r][c + 1] === val) return false;
                // Check down
                if (r < GRID_SIZE - 1 && grid[r + 1][c] === val) return false;
            }
        }
        return true;
    }

    function triggerGameOver() {
        gameOver = true;
        overlayIcon.textContent = '😔';
        overlayTitle.textContent = '游戏结束';
        overlayMsg.textContent = '再试一次吧！分数：' + score;
        showOverlay();
    }

    function showOverlay() {
        overlay.classList.remove('hidden');
    }

    function hideOverlay() {
        overlay.classList.add('hidden');
    }

    // ==================== Particles ====================
    function spawnParticles() {
        const emojis = ['📜', '✨', '🎉', '🌟', '💫', '📖', '🖋️', '🏮', '🎊', '⭐', '📚', '🎯'];
        const rect = boardEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const p = document.createElement('div');
                p.className = 'particle';
                p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                const angle = Math.random() * Math.PI * 2;
                const dist = 80 + Math.random() * 200;
                p.style.left = cx + 'px';
                p.style.top = cy + 'px';
                p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
                p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
                p.style.fontSize = (16 + Math.random() * 28) + 'px';
                particlesEl.appendChild(p);
                setTimeout(() => p.remove(), 1800);
            }, i * 20);
        }
    }

    // ==================== Input Handling ====================
    document.addEventListener('keydown', function (e) {
        if (gameOver) return;
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                e.preventDefault();
                move('up');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                e.preventDefault();
                move('down');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                e.preventDefault();
                move('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                e.preventDefault();
                move('right');
                break;
        }
    });

    // Touch / swipe support
    let touchStartX = 0,
        touchStartY = 0;
    document.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, {
        passive: true
    });

    document.addEventListener('touchend', function (e) {
        if (gameOver) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const minSwipe = 30;

        if (Math.max(absDx, absDy) < minSwipe) return;

        if (absDx > absDy) {
            move(dx > 0 ? 'right' : 'left');
        } else {
            move(dy > 0 ? 'down' : 'up');
        }
    });

    // Prevent scrolling on game area
    boardEl.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, {
        passive: false
    });

    // ==================== Public API ====================
    window.newGame = function () {
        hideOverlay();
        particlesEl.innerHTML = '';
        init();
    };

    // ==================== Start ====================
    init();
})();