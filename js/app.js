var body = document.getElementsByTagName("body")[0];

var canvas = document.getElementById("game");
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;

// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};

/* event bind */
function bindEvent() {
    var self = this;
    //点击按钮，进入对应的游戏画面
    //使用Attribute读取和设置data-*自定义属性
    body.addEventListener('click', function(e) {
        if (e.target == document.getElementsByClassName('js-start')[0]) {
            body.setAttribute('data-status', 'start');
            GAME.start();
        }
    })
    body.addEventListener('click', function(e) {
        if (e.target == document.getElementsByClassName('js-rule')[0]) {
            body.setAttribute('data-status', 'rule');
        }
    })
    body.addEventListener('click', function(e) {
        if (e.target == document.getElementsByClassName('js-setting')[0]) {
            body.setAttribute('data-status', 'setting');
        }
    })
    //点击菜单里的按钮，回到开始界面
    body.addEventListener('click', function(e) {
        if (e.target == document.getElementsByClassName('js-confirm-rule')[0]) {
            body.setAttribute('data-status', 'index');
        }
    })
    body.addEventListener('click', function(e) {
        if (e.target == document.getElementsByClassName('js-confirm-setting')[0]) {
            body.setAttribute('data-status', 'index');
        }
    })

}

//游戏对象

var GAME = {
    //游戏初始化
    init: function(opts) {
        // set opts
        var opts = Object.assign({}, opts, CONFIG);
        this.opts = opts;

        // plane original postion.
        this.planePosX = canvasWidth / 2 - opts.planeSize.width;
        this.planePosY = canvasHeight - opts.planeSize.height - 50;
    },

    //游戏初始设置
    start: function() {
        var self = this;
        var opts = this.opts;
        var images = this.images;

        this.enemies = [];
        this.score = 0;

        this.createSmallEnemyInterval = setInterval(function() {
            self.createEnemy('normal');
        }, 500);
        this.createBigEnemyInterval = setInterval(function() {
            self.createEnemy('big');
        }, 1500);
        
        this.update();
    },

    update: function() {
        var self = this;
        var opts = this.opts;

        this.updateElement();
        context.clearRect(0,0, canvasWidth, canvasHeight);
      
        this.draw();

        requestAnimFrame(function() {
            self.update()
        });
    },

    //更新当前所有元素的状态
    updateElement: function() {
        var opts = this.opts;
        var enemySize = opts.enemySize;
        var enemies = this.enemies;
        var i = enemies.length;

        //循环更新敌人
        while (i--) {
            var enemy = enemies[i];
            enemy.down();
            if (enemy.y >= canvasHeight) {
                this.enemies.splice(i, 1);
            } else {
                //判断飞机状态
            }
        }
    },

    //生成敌人
    createEnemy: function(enemyType) {
        var enemies = this.enemies;
        var opts = this.opts;
        var images = this.images || {};
        var enemySize = opts.enemySmallSize;
        var enemySpeed = opts.enemySpeed;
        var enemyIcon = resourceHelper.getImage('enemySmallIcon');
        var enemyBoomIcon = resourceHelper.getImage('enemySmallBoomIcon');

        var enemyLive = 1;

        if (enemyType === 'big') {
            enemySize = opts.enemyBigSize;
            enemyIcon = resourceHelper.getImage('enemyBigIcon');
            enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
            enemySpeed = opts.enemySpeed * 0.6;

            enemyLive = 10;
        }

        var initOpt = {
            x: Math.floor(Math.random() * (canvasWidth - enemySize.width)),
            y: -enemySize.height,
            enemyType: enemyType,
            live: enemyLive,
            width: enemySize.width,
            height: enemySize.height,
            speed: enemySpeed,
            icon: enemyIcon,
            boomIcon: enemyBoomIcon
        }

        if (enemies.length < opts.enemyMaxNum) {
            enemies.push(new Enemy(initOpt));
        }
        
        console.log(enemies);
    },

    end: function() {

    },

    draw: function() {
        this.enemies.forEach(function(enemy){
            enemy.draw();
        });
    }
};

function init() {
    resourceHelper.load(CONFIG.resources, function(resources) {
        GAME.init();
        bindEvent();
    });
}

init();