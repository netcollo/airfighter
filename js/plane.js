/**
 * 子类 Plane 飞机
 * 1 继承Element
 * 2. 依赖 Bullet
 */

var Plane = function (opts) {
    var opts = opts || {};
    //调用父类方法
    Element.call(this, opts);

    //特有属性
    this.status = 'normal'
    this.icon = opts.icon;
    // 子弹相关
    this.bullets = [];
    this.bulletSize = opts.bulletSize;
    this.bulletSpeed = opts.bulletSpeed;
    this.bulletIcon = opts.bulletIcon;
    this.shootSound = opts.shootSound;
}

Plane.prototype = new Element();

/**
 * 方法：hasHit 判断碰撞
 * @param {target} target 目标元素实例
 */
Plane.prototype.hasCrash = function(target) {
    var crash = false;

    if(!(this.x + this.width < target.x) && !(target.x + target.width < this.x) &&
       !(this.y + this.height <target.y) && !(target.y + target.height < this.y)) {
           crash = true;
       }
       return crash;
}

/**
 * 判断是否击中当前元素;
 */
Plane.prototype.hasHit = function(target) {
    var bullets = this.bullets;
    var hasHit = false;
    for (var j = bullets.length-1; j >=0; j--) {
        if (bullets[j].hasCrash(target)) {
            this.bullets.splice(j, 1);
            hasHit = true;
            break;
        }
    }
    return hasHit;
}

/**
 * 修改飞机当前位置
 */
Plane.prototype.setPosition = function(newPlaneX, newPlaneY) {
    this.x = newPlaneX;
    this.y = newPlaneY;
    return this;
}

Plane.prototype.startShoot = function() {
    var self = this;
    var bulletWidth = this.bulletSize.width;
    var bulletHeight = this.bulletSize.height;

    this.shootingInterval = setInterval(function() {
        var bulletX = self.x + self.width / 2 - bulletWidth /2;
        var bulletY = self.y  - bulletHeight;

        self.bullets.push(new Bullet ({
            x: bulletX,
            y: bulletY,
            width: bulletWidth,
            height: bulletHeight,
            speed: self.bulletSpeed,
            icon: self.bulletIcon,
        }));
    }, 200);
}

Plane.prototype.DrawBullets = function() {
    var bullets = this.bullets;
    var i = bullets.length;
    while (i --) {
        var bullet = bullets[i];
        bullet.fly();
        if (bullet.y <= 0) {
            bullets.splice(i, 1);
        } else {
            bullet.draw();
        }
    }
};

Plane.prototype.draw = function() {
    switch (this.status) {
        case 'booming':
            context.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
            break;
        default :
            context.drawImage(this.icon, this.x, this.y, this.width,this.height);
            break;
    }
    this.drawBullets();
    return this;
}