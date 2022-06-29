var that;
class Tab{
    constructor(id){
        //获取元素
        that = this;
        //console.log(that);
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        //section的父元素
        this.tabscon = this.main.querySelector('.tabscon');
        console.log(this.ul);
        this.init();
    }
    init(){
        this.updateNode();
        this.add.onclick = this.addTab;
        //init 初始化操作，让相关元素绑定事件
        for(var i = 0; i < this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;//如果加括号，页面加载完就立即调用
            this.remove[i].onclick = this.removeTab;
            console.log(this.spans);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 获取所有li和setion的方法
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    //1.切换功能
    toggleTab(){
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    //清除元素
    clearClass(){
        for(var i = 0; i < this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //2.添加功能
    addTab(){
       //1.创建li元素和section元素
    //    可以利用insertAdjacentHTML()直接把字符串格式元素添加到父元素中
    that.clearClass();
    var li = ' <li ><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
    var section = ' <section class="conactive">测试1</section>'
    that.ul.insertAdjacentHTML('beforeend',li);
    that.tabscon.insertAdjacentHTML('beforeend',section);
    that.init();
    }

    //3.删除功能
    removeTab(e){
        e.stopPropagation();//防止冒泡
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        if(document.querySelector('.liactive'))
        return
        if(index!=0){
            index--;
            // 手动调用点击事件
            that.lis[index].click();
        }
       
    }

    //4.修改功能
    editTab(){
        //双击禁止选中文字
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type = "text" />';
        var input = this.children[0];
        input.value = str;
        input.select();//文本框文字处于选中
        //离开文本框后，把文字赋值给span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        }
        //键盘事件按回车键输入内容
        input.onkeyup = function(e){
            if(e.keyCode == 13){
                //手动调用表单失去焦点事件
                this.onblur();
            }
        }
    }
}

new Tab('#tab');