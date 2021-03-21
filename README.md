# nestjs-rest-boilerplate

기본적인 사용방법을 위해 만듦.  
각 상황에 따라 사용할수있도록 브랜치별로 나누었다.

## replication-db

추가/수정/삭제등을 하는 master 와 조회만을 하는 slave 구조로 디비를 나눠보았다  
주로 설정된 파일은 `@/conf/*` 쪽에 위치해있다.  
비교적 간단하게 설정이 가능하여 좋은듯..  
원래 `entities` 부분은 `path` 로 설정해두었었지만 만약 추가로 디비 커넥션을 추가하게 되는경우  
이름으로 구분하면 충분히 쉽지만 패키지 구조가 어떻게 보면 각 도메인별 구분이 이상하다는 느낌을 받음.  
그래서 명시적으로 사용하는 엔티티를 직접 넣어주는게 좋겠다고 생각했다. 지극히 개인적인 생각

```javascript
  getMainConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      replication: {
        master: {
          host: this.masterUrl,
          port: this.masterPort,
          username: this.masterUsername,
          password: this.masterPassword,
          database: this.masterDatabase,
        },
        slaves: [
          {
            host: this.slaveUrl,
            port: this.slavePort,
            username: this.slaveUsername,
            password: this.slavePassword,
            database: this.slaveDatabase,
          },
        ],
      },
      entities: [School],
    };
  }
```

## cache

맨처음 `nestjs` 로 캐시를 만들때는 캐시 설정도 이곳에서 해야겠다 생각을 해서 이것저것 설정했다가 다시보니  
그러면 괜히 웹서버가 가지고있는 책임같은게 많아지는걸로 보임  
그냥 이곳에서 사용할때는 가볍게 `store` 에 가져온다...라는 느낌만 사용  
추가로 문서를 보니 `async` 로도 가능하니 `config` 에서 `replication-db` 에서 했던것처럼 주입해주면 될듯

```javascript
CacheModule.registerAsync({
  useFactory: () => ({
    ttl: 5,
  }),
});
```