var that;
class Tab{
    constructor(id){

        that = this;

        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');

        this.ul = this.main.querySelector('.fisrstnav ul:first-child');

        this.tabscon = this.main.querySelector('.tabscon');
        console.log(this.ul);
        this.init();
    }
    init(){
        this.updateNode();
        this.add.onclick = this.addTab.bind(this.lis[i],this);

        for(var i = 0; i < this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);//第一个参数this.lis[i]作为this指向自己，第二个参数this指向window传参进函数
            this.remove[i].onclick = this.removeTab.bind(this.remove[i],this);
            console.log(this.spans);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }

    toggleTab(that){
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    clearClass(){
        for(var i = 0; i < this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }


    addTab(that){

    that.clearClass();
    var li = ' <li ><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
    var section = ' <section class="conactive">测试1</section>'
    that.ul.insertAdjacentHTML('beforeend',li);
    that.tabscon.insertAdjacentHTML('beforeend',section);
    that.init();
    }


    removeTab(that,e){
        e.stopPropagation();
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        if(document.querySelector('.liactive'))
        return
        if(index!=0){
            index--;

            that.lis[index].click();
        }
       
    }


    editTab(e){

        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type = "text" />';
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        }

        input.onkeyup = function(e){
            if(e.keyCode == 13){

                this.onblur();
            }
        }
    }
}

new Tab('#tab');