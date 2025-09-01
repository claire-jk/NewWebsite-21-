new Vue({
  el: '#app',
  data: {
    timelineData: [
      {
        month: '七月',
        text: '佐佐木與宮野 -\n佐佐木與宮野初相識\n(佐佐木高中二年級 / 宮野高中一年級)，\n受到腐男宮野影響佐佐木開始入坑BL漫畫',
        side: 'left',
        visible: false
      },
      {
        month: '八月',
        text: '平野與鍵浦 -\n平野與鍵浦初相識並成為同寢室友\n(平野高中二年級 / 鍵浦高中一年級)，\n鍵浦大概是相處一段時間後就對平野動心(但這時候沒有說出來)，趁著平野生日送他耳環(之後平野都帶著鍵浦送的耳環)',
        side: 'right',
        visible: false
      },
      {
        month: '十月',
        text: '佐佐木與宮野 -\n佐佐木喜歡上宮野\n這時候佐佐木算是半開玩笑的說出喜歡對方，但宮野以為只是一般的玩笑話',
        side: 'left',
        visible: false
      },
      {
        month: '十二月',
        text: '平野與鍵浦 -\n鍵浦正要告白但被半澤打斷\n平野為了報答鍵浦上次生日送他耳環，所以就在鍵浦生日時帶鍵浦去看籃球比賽(鍵浦的興趣是打籃球)',
        side: 'right',
        visible: false
      },
      {
        month: '一月',
        text: '平野與鍵浦 -\n鍵浦當面向平野告白\n平野認為自己無法回應鍵浦的心意所以回絕了',
        side: 'right',
        visible: false
      },
      {
        month: '二月初',
        text: '平野與鍵浦 -\n平野開始思考自己對鍵浦的情感\n為了確認情感鍵浦提出每天觸碰平野10秒鐘來讓平野確認自己的情感\n發生了一些意外，平野順勢向鍵浦提議兩人繼續同房的提議，目的就是透過同房相處釐清自己對鍵浦的情感。',
        side: 'right',
        visible: false
      },
      {
        month: '二月底',
        text: '平野與鍵浦 -\n兩人確定繼續同寢\n在每日的互動後，平野漸漸發現自己對鍵浦產生不一樣的情感',
        side: 'right',
        visible: false
      },
      {
        month: '二月',
        text: '佐佐木與宮野 -\n佐佐木在情人節送宮野巧克力',
        side: 'left',
        visible: false
      },
      {
        month: '三月',
        text: '佐佐木與宮野 -\n佐佐木趁著宮野睡著輕聲說出愛意\n宮野在情人節回送巧克力給佐佐木，佐佐木在電車上輕聲說出對宮野的想法，然後宮野聽到了',
        side: 'left',
        visible: false
      },
      {
        month: '四月',
        text: '佐佐木與宮野 -\n宮野開始思考自己是不是喜歡佐佐木\n(佐佐木高中三年級 / 宮野高中二年級)，\n宮野開始思索自己對學長抱有何種想法',
        side: 'left',
        visible: false
      },
      {
        month: '五月',
        text: '佐佐木與宮野 -\n佐佐木正式向宮野告白\n佐佐木將內心想法說出，宮野尚未回應',
        side: 'left',
        visible: false
      },
      {
        month: '七月',
        text: '佐佐木與宮野 -\n宮野跟佐佐木說他需要時間思考\n宮野提出要繼續思考這份情感，佐佐木同意並繼續以朋友兼學長的身分與宮野互動',
        side: 'left',
        visible: false
      },
      {
        month: '十一月',
        text: '佐佐木與宮野 -\n宮野確定自己對佐佐木的感情是愛情\n在一點一滴的日常互動下，宮野終於確認自己的心意。開始思考如何回覆',
        side: 'left',
        visible: false
      },
      {
        month: '一月',
        text: '佐佐木與宮野 -\n宮野表白，佐宮正式交往\n在平野跟半澤的助攻下佐宮兩人表白正式交往',
        side: 'left',
        visible: false
      },
      {
        month: '三月',
        text: '佐佐木與宮野 -\n佐佐木畢業\n',
        side: 'left',
        visible: false
      }
    ],
    scrollProgress: 0
  },
  mounted() {
    this.initObserver();
    window.addEventListener('scroll', this.updateScrollProgress);
  },
  methods: {
    initObserver() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            this.timelineData[index].visible = true;
          }
        });
      }, { threshold: 0.1 });

      this.$nextTick(() => {
        document.querySelectorAll('.timeline-item').forEach((el, idx) => {
          el.dataset.index = idx;
          observer.observe(el);
        });
      });
    },
    updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = Math.round((scrollTop / docHeight) * 100);
    }
  }
});