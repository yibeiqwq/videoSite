# 使用基础镜像
FROM node

# 创建目录，并且指定工作目录
RUN mkdir -p /usr/src/app

# 使用npm安装依赖包
COPY . /user/src/app
 
WORKDIR /user/src/app
RUN yarn install \
    && yarn add crypto-js \
    && yarn add uuidv4

#映射4000端口(已经修改项目的默认端口为3004)(指定容器需要映射到宿主机器的端口)
EXPOSE 8000