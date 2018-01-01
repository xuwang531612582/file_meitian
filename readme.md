step1:
    
    创建一个新文件夹
    在github上创建一个工程

step2:

    在创建的文件夹中打开git Bash
    然后输入命令
    git init  初始化
    git add .  添加所有
    git commit -am"xuwang"
    git status 
    git diff
    git config --global user.email "youxxx@yy.com"
    git config --global user.name "随便"
    git remote add origin 填写git工程的地址
    git push origin master

ssh key的设置

    cd ~  cd到家目录下
    pwd
    ls -a
    ssh-keygen -t rsa -C "xxxxxx@yy.com"
    ls -a
    cd .ssh/
    ls
    cat id_rsa.pub  得到key
    然后复杂到github中setting  导航目录里面的 SSH and GPG keys 
    然后点击 New SSH key  
    然后 随便填写名字
    然后把  在gitBash里面的key 粘贴到 key输入框里面

    