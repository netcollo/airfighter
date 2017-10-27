//enemy

var Enemy = function (opts) {
    var opts = opts || {};
    //调用父类方法
    Element.call(this, opts);

    // special function
    this.status = 'normal';
    this.icon = opts.icon;
    this.live = opts.live;
    this.type = opts.type;
    // boom function
    // this.boomIcon = opts.boomIcon;
    // this.boomCount = 0;
};
//继承Element 的方法
Enemy.prototype = new Element();

Enemy.prototype.down = function() {
    this.move (0, this.speed);
}

Enemy.prototype.draw = function() {
    //context.fillRect(this.x, this.y, this.width, this.height);
    switch(this.status) {
        case "normal" :
            context.drawImage(this.icon, this.x, this.y, this.width, this.height);
            break;
        case 'booming':
            context.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
            break;
    }
}