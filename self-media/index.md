---
layout: page
sidebar: false
---
<script setup>
import { ref, computed, onMounted } from 'vue'

const media = [
    {
        icon: '/react-docs/icon/1.png',
        fans: 1413,
        name: '小红书'
    },
    {
        icon: '/react-docs/icon/2.png',
        fans: 60000,
        name: '哔哩哔哩'
    },
    {
        icon: '/react-docs/icon/3.png',
        fans: 25000,
        name: '抖音'
    },
    {
        icon: '/react-docs/icon/4.png',
        fans: 2501,
        name: '视频号'
    },
    {
        icon: '/react-docs/icon/5.png',
        fans: 15257,
        name: '掘金'
    },
    {
        icon: '/react-docs/icon/6.png',
        fans: 2404,
        name: '公众号'
    },
    {
        icon: '/react-docs/icon/7.png',
        fans: 22523,
        name: 'CSDN'
    },
    {
        icon: '/react-docs/icon/8.png',
        fans: 1766,
        name: 'QQ'
    },
    {
        icon: '/react-docs/icon/9.png',
        fans: 7280,
        name: '微信'
    },
    {
        icon: '/react-docs/icon/10.png',
        fans: 90,
        name: '微博'
    }
]

const honors = [
    '2024年掘金年度总冠军',
    '2023年掘金年度总冠军', 
    '2022年年度第六名',
    '京东黑客马拉松亚军',
    '阿里云专家博主',
    'CSDN认证博主',
    '公益免费课程',
    'Node.js全解作者-清华大学出版社合作'
]

const totalFans = computed(() => {
  return media.reduce((sum, item) => sum + item.fans, 0)
})

const formatFans = (fans) => {
  if (fans >= 10000) {
    return (fans / 10000).toFixed(1) + '万'
  }
  return fans
}

const currentDate = new Date()
const formattedDate = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`
</script>

<div class="media-matrix">
  <div class="header">
    <h1>小满zs的自媒体矩阵</h1>
    <p>截止{{formattedDate}}粉丝数据统计</p>
    <div class="total-fans">
      <span>总粉丝数: {{formatFans(totalFans)}}</span>
    </div>
  </div>
  
  <div class="honors-section">
    <h2>荣誉奖项</h2>
    <div class="honors-grid">
      <div v-for="(honor, index) in honors" :key="index" class="honor-item">
        <span class="honor-text">{{honor}}</span>
      </div>
    </div>
  </div>
  
  <div class="media-grid">
    <div v-for="(item, index) in media" :key="index" class="media-card">
      <div class="media-icon">
        <img :src="item.icon" :alt="item.name">
      </div>
      <div class="media-name"></div>
      <div class="media-fans">{{formatFans(item.fans)}}</div>
      <div class="media-label">{{item.name}}</div>
    </div>
  </div>
</div>

<style>
.media-matrix {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 30px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  font-size: 28px;
}

.header p {
  margin: 10px 0;
  font-size: 14px;
}

.total-fans {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px 15px;
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
}

.honors-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.honors-section h2 {
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 24px;
}

.honors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.honor-item {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.honor-text {
  font-size: 14px;
  font-weight: 500;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.media-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.media-card:hover {
  transform: translateY(-5px);
}

.media-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
}

.media-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.media-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.media-fans {
  font-size: 24px;
  font-weight: bold;
  color: #4285f4;
}

.media-label {
  font-size: 12px;
  color: #999;
}

</style>