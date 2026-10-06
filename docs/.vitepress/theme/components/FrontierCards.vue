<template>
  <section class="frontier-section">
    <h2 class="frontier-title">
      <span class="frontier-icon">🔭</span>
      探索前沿
    </h2>
    <p class="frontier-subtitle">AI 领域热门方向速览 · 点击了解入门路线</p>
    <div class="frontier-grid">
      <a
        v-for="(item, i) in topics"
        :key="item.name"
        :href="base + item.link"
        class="frontier-card"
        :style="{ '--delay': i * 60 + 'ms' }"
      >
        <div class="card-icon-wrap">
          <span class="card-emoji">{{ item.emoji }}</span>
        </div>
        <h3 class="card-name">{{ item.name }}</h3>
        <p class="card-desc">{{ item.desc }}</p>
        <span class="card-arrow">→</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { site } = useData()
const base = site.value.base

const topics = [
  {
    emoji: '🧠',
    name: '知识图谱',
    desc: '结构化知识表示与推理，让机器读懂实体关系',
    link: '前沿/知识图谱'
  },
  {
    emoji: '🚗',
    name: '自动驾驶感知',
    desc: '多传感器融合与场景理解，从 BEV 到端到端',
    link: '前沿/自动驾驶感知'
  },
  {
    emoji: '⚡',
    name: '边缘智能',
    desc: '将模型部署到手机与 IoT 设备，算力与功耗的平衡',
    link: '前沿/边缘智能'
  },
  {
    emoji: '🎵',
    name: '语音与音频',
    desc: '语音识别、合成与音乐生成，让机器听懂声音',
    link: '前沿/语音与音频'
  },
  {
    emoji: '🗜️',
    name: '模型压缩',
    desc: '剪枝、量化与蒸馏，让大模型跑进小设备',
    link: '前沿/模型压缩'
  },
  {
    emoji: '📊',
    name: '图神经网络',
    desc: '处理社交网络、分子结构等图结构数据的利器',
    link: '前沿/图神经网络'
  },
  {
    emoji: '🧬',
    name: '脑启发计算',
    desc: '脉冲神经网络与类脑芯片，借鉴大脑的高效计算',
    link: '前沿/脑启发计算'
  },
  {
    emoji: '🧊',
    name: '3D 视觉',
    desc: '点云处理、NeRF 与 3D 重建，从 2D 看懂 3D 世界',
    link: '前沿/3D视觉'
  }
]
</script>

<style scoped>
.frontier-section {
  margin: 0 auto;
  max-width: 1152px;
  padding: 48px 24px 64px;
}

/* ===== 标题动效 ===== */
.frontier-title {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  background: linear-gradient(120deg, var(--vp-c-brand-1), #9b59f5, var(--vp-c-brand-1));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.frontier-icon {
  -webkit-text-fill-color: initial;
  margin-right: 4px;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.frontier-subtitle {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin-bottom: 32px;
}

/* ===== 网格布局 ===== */
.frontier-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .frontier-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

/* ===== 卡片动效 ===== */
.frontier-card {
  position: relative;
  display: block;
  padding: 24px 20px 20px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: cardIn 0.5s ease forwards;
  animation-delay: var(--delay);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* hover 渐变光晕 */
.frontier-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #9b59f5);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 0;
}

.frontier-card:hover::before {
  opacity: 1;
}

.frontier-card:hover {
  border-color: transparent;
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(79, 110, 247, 0.25);
}

/* 卡片内容浮在光晕之上 */
.card-icon-wrap,
.card-name,
.card-desc,
.card-arrow {
  position: relative;
  z-index: 1;
}

/* hover 时内容变白 */
.frontier-card:hover .card-name {
  color: #fff;
}

.frontier-card:hover .card-desc {
  color: rgba(255, 255, 255, 0.85);
}

.frontier-card:hover .card-arrow {
  color: #fff;
  transform: translateX(4px);
}

/* emoji 图标 */
.card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(79, 110, 247, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: transform 0.3s, background 0.3s;
}

.frontier-card:hover .card-icon-wrap {
  transform: scale(1.15) rotate(-6deg);
  background: rgba(255, 255, 255, 0.2);
}

.card-emoji {
  font-size: 1.5rem;
  line-height: 1;
}

.card-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
  border: none;
  padding: 0;
  transition: color 0.3s;
}

.card-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
  transition: color 0.3s;
}

/* 右下角箭头 */
.card-arrow {
  position: absolute;
  bottom: 16px;
  right: 18px;
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.3s;
}

.frontier-card:hover .card-arrow {
  opacity: 1;
}
</style>
