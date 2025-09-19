Component({
  properties: {
    title: {
      type: String,
      value: '操作成功'
    }
  },
  data: {
    visible: false
  },
  methods: {
    show(duration = 1500) {
      this.setData({ visible: true });
      setTimeout(() => {
        this.setData({ visible: false });
      }, duration);
    }
  }
});