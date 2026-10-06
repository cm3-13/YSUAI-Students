<template>
  <section class="frontier-section">
    <h2 class="frontier-title">
      <span class="frontier-icon">🔭</span>
      探索前沿
    </h2>
    <p class="frontier-subtitle">AI 领域热门方向速览 · 点击了解入门路线</p>
    <div class="frontier-grid">
      <a
        v-for="item in topics"
        :key="item.name"
        :href="item.link"
        class="frontier-card"
      >
        <div class="card-emoji">{{ item.emoji }}</div>
        <h3 class="card-name">{{ item.name }}</h3>
        <p class="card-desc">{{ item.desc }}</p>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const topics = [
  {
    emoji: '🧠',
    name: '知识图谱',
    desc: '结构化知识表示与推理，让机器读懂实体关系',
    link: '/前沿/知识图谱'
  },
  {
    emoji: '🚗',
    name: '自动驾驶感知',
    desc: '多传感器融合与场景理解，从 BEV 到端到端',
    link: '/前沿/自动驾驶感知'
  },
  {
    emoji: '⚡',
    name: '边缘智能',
    desc: '将模型部署到手机与 IoT 设备，算力与功耗的平衡',
    link: '/前沿/边缘智能'
  },
  {
    emoji: '🎵',
    name: '语音与音频',
    desc: '语音识别、合成与音乐生成，让机器听懂声音',
    link: '/前沿/语音与音频'
  },
  {
    emoji: '🗜️',
    name: '模型压缩',
    desc: '剪枝、量化与蒸馏，让大模型跑进小设备',
    link: '/前沿/模型压缩'
  },
  {
    emoji: '📊',
    name: '图神经网络',
    desc: '处理社交网络、分子结构等图结构数据的利器',
    link: '/前沿/图神经网络'
  },
  {
    emoji: '🧬',
    name: '脑启发计算',
    desc: '脉冲神经网络与类脑芯片，借鉴大脑的高效计算',
    link: '/前沿/脑启发计算'
  },
  {
    emoji: '🧊',
    name: '3D 视觉',
    desc: '点云处理、NeRF 与 3D 重建，从 2D 看懂 3D 世界',
    link: '/前沿/3D视觉'
  }
]
</script>

<style scoped>
.frontier-section {
  margin: 0 auto;
  max-width: 1152px;
  padding: 48px 24px 64px;
}

.frontier-title {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.frontier-icon {
  -webkit-text-fill-color: initial;
  margin-right: 4px;
}

.frontier-subtitle {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin-bottom: 32px;
}

.frontier-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .frontier-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.frontier-card {
  display: block;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
}

.frontier-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-emoji {
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.card-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
  border: none;
  padding: 0;
}

.card-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}
</style>
