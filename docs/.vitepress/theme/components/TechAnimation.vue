<template>
  <div class="tech-anim-wrap">
    <canvas ref="canvasRef" class="tech-canvas"></canvas>
    <div class="tech-anim-labels">
      <span v-for="label in labels" :key="label.text"
        class="tech-label" :class="label.cls"
        :style="{ left: label.x, top: label.y }">
        {{ label.text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{ type: string }>()

const canvasRef = ref<HTMLCanvasElement>()
let animId: number | null = null

const labels = computed(() => {
  const map: Record<string, { text: string; cls: string; x: string; y: string }[]> = {
    'knowledge-graph': [
      { text: 'Entity', cls: 'lbl-blue', x: '12%', y: '42%' },
      { text: 'Relation', cls: 'lbl-purple', x: '45%', y: '15%' },
      { text: 'Triple (h,r,t)', cls: 'lbl-blue', x: '72%', y: '55%' }
    ],
    'autonomous-driving': [
      { text: 'LiDAR', cls: 'lbl-blue', x: '10%', y: '20%' },
      { text: 'Camera', cls: 'lbl-purple', x: '75%', y: '18%' },
      { text: 'BEV Grid', cls: 'lbl-blue', x: '40%', y: '72%' }
    ],
    'edge-ai': [
      { text: 'NPU', cls: 'lbl-blue', x: '15%', y: '30%' },
      { text: 'INT8 Quant', cls: 'lbl-purple', x: '68%', y: '22%' },
      { text: 'Inference', cls: 'lbl-blue', x: '42%', y: '70%' }
    ],
    'speech-audio': [
      { text: 'ASR', cls: 'lbl-blue', x: '12%', y: '38%' },
      { text: 'Mel Spect', cls: 'lbl-purple', x: '68%', y: '20%' },
      { text: 'TTS', cls: 'lbl-blue', x: '75%', y: '65%' }
    ],
    'model-compression': [
      { text: 'FP32', cls: 'lbl-purple', x: '12%', y: '35%' },
      { text: 'Prune', cls: 'lbl-blue', x: '48%', y: '15%' },
      { text: 'INT8', cls: 'lbl-blue', x: '72%', y: '55%' }
    ],
    'graph-nn': [
      { text: 'Node', cls: 'lbl-blue', x: '18%', y: '40%' },
      { text: 'Message', cls: 'lbl-purple', x: '48%', y: '12%' },
      { text: 'Aggregate', cls: 'lbl-blue', x: '70%', y: '58%' }
    ],
    'brain-computing': [
      { text: 'Spiking', cls: 'lbl-blue', x: '15%', y: '35%' },
      { text: 'STDP', cls: 'lbl-purple', x: '65%', y: '18%' },
      { text: 'Neuromorphic', cls: 'lbl-blue', x: '38%', y: '72%' }
    ],
    '3d-vision': [
      { text: 'Point Cloud', cls: 'lbl-blue', x: '10%', y: '38%' },
      { text: 'NeRF', cls: 'lbl-purple', x: '70%', y: '18%' },
      { text: '3DGS', cls: 'lbl-blue', x: '72%', y: '62%' }
    ]
  }
  return map[props.type] || []
})

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w: number, h: number
  let time = 0

  function resize() {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas!.parentElement!.getBoundingClientRect()
    w = rect.width
    h = Math.min(360, window.innerHeight * 0.38)
    canvas!.width = w * dpr
    canvas!.height = h * dpr
    canvas!.style.width = w + 'px'
    canvas!.style.height = h + 'px'
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  // ===== 共用工具 =====
  function circle(x: number, y: number, r: number, color: string, alpha = 1) {
    ctx!.beginPath()
    ctx!.arc(x, y, r, 0, Math.PI * 2)
    ctx!.fillStyle = color.replace('ALPHA', String(alpha))
    ctx!.fill()
  }

  function glowCircle(x: number, y: number, r: number, color: string, alpha = 0.3) {
    const grad = ctx!.createRadialGradient(x, y, 0, x, y, r * 4)
    grad.addColorStop(0, color.replace('ALPHA', String(alpha * 0.6)))
    grad.addColorStop(1, color.replace('ALPHA', '0'))
    ctx!.beginPath()
    ctx!.arc(x, y, r * 4, 0, Math.PI * 2)
    ctx!.fillStyle = grad
    ctx!.fill()
  }

  // ===== 各主题动画 =====
  const animations: Record<string, () => void> = {
    // 知识图谱：节点连线图
    'knowledge-graph'() {
      const nodes = [
        { x: w * 0.15, y: h * 0.5 }, { x: w * 0.35, y: h * 0.25 },
        { x: w * 0.35, y: h * 0.75 }, { x: w * 0.55, y: h * 0.5 },
        { x: w * 0.75, y: h * 0.25 }, { x: w * 0.75, y: h * 0.75 },
        { x: w * 0.9, y: h * 0.5 }, { x: w * 0.55, y: h * 0.2 },
        { x: w * 0.55, y: h * 0.8 }
      ]
      const edges = [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6],[1,7],[2,8],[7,3],[8,3]]
      edges.forEach(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        ctx!.beginPath()
        ctx!.moveTo(na.x, na.y)
        ctx!.lineTo(nb.x, nb.y)
        const pulse = Math.sin(time * 0.02 + i * 0.5) * 0.5 + 0.5
        ctx!.strokeStyle = `rgba(79, 110, 247, ${0.08 + pulse * 0.12})`
        ctx!.lineWidth = 1
        ctx!.stroke()
        // 沿边流动的粒子
        const t = (time * 0.003 + i * 0.15) % 1
        const px = na.x + (nb.x - na.x) * t
        const py = na.y + (nb.y - na.y) * t
        circle(px, py, 2, 'rgba(79, 110, 247, ALPHA)', 0.7)
      })
      nodes.forEach((n, i) => {
        const pulse = Math.sin(time * 0.03 + i) * 0.3 + 0.7
        glowCircle(n.x, n.y, 4, 'rgba(79, 110, 247, ALPHA)', pulse * 0.2)
        circle(n.x, n.y, 4, 'rgba(79, 110, 247, ALPHA)', pulse)
      })
    },

    // 自动驾驶感知：雷达扫描
    'autonomous-driving'() {
      // BEV 网格
      ctx!.strokeStyle = 'rgba(79, 110, 247, 0.06)'
      ctx!.lineWidth = 0.5
      for (let i = 0; i < 12; i++) {
        const x = w * 0.1 + (w * 0.8 / 11) * i
        ctx!.beginPath(); ctx!.moveTo(x, h * 0.15); ctx!.lineTo(x, h * 0.85); ctx!.stroke()
      }
      for (let i = 0; i < 8; i++) {
        const y = h * 0.15 + (h * 0.7 / 7) * i
        ctx!.beginPath(); ctx!.moveTo(w * 0.1, y); ctx!.lineTo(w * 0.9, y); ctx!.stroke()
      }
      // 扫描线
      const cx = w * 0.5, cy = h * 0.5
      const angle = time * 0.015
      const scanLen = Math.min(w, h) * 0.42
      const grad = ctx!.createLinearGradient(cx, cy, cx + Math.cos(angle) * scanLen, cy + Math.sin(angle) * scanLen)
      grad.addColorStop(0, 'rgba(79, 110, 247, 0.4)')
      grad.addColorStop(1, 'rgba(79, 110, 247, 0)')
      ctx!.beginPath(); ctx!.moveTo(cx, cy)
      ctx!.lineTo(cx + Math.cos(angle) * scanLen, cy + Math.sin(angle) * scanLen)
      ctx!.strokeStyle = grad; ctx!.lineWidth = 2; ctx!.stroke()
      // 同心圆
      for (let r = 30; r < scanLen; r += 35) {
        const alpha = 0.08 * (1 - r / scanLen)
        ctx!.beginPath(); ctx!.arc(cx, cy, r, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(79, 110, 247, ${alpha})`; ctx!.lineWidth = 1; ctx!.stroke()
      }
      // 检测框（模拟目标）
      const targets = [
        { x: w * 0.3, y: h * 0.35, w: 36, h: 22 },
        { x: w * 0.65, y: h * 0.55, w: 30, h: 18 },
        { x: w * 0.45, y: h * 0.7, w: 26, h: 16 }
      ]
      targets.forEach((t, i) => {
        const pulse = Math.sin(time * 0.04 + i * 2) * 0.3 + 0.7
        ctx!.strokeStyle = `rgba(155, 89, 245, ${0.4 * pulse})`
        ctx!.lineWidth = 1.5
        ctx!.strokeRect(t.x, t.y, t.w, t.h)
        // 角标
        const cs = 6
        ctx!.strokeStyle = `rgba(155, 89, 245, ${0.7 * pulse})`
        ctx!.lineWidth = 2
        ;[[t.x, t.y, 1, 1], [t.x + t.w, t.y, -1, 1], [t.x, t.y + t.h, 1, -1], [t.x + t.w, t.y + t.h, -1, -1]].forEach(([x, y, dx, dy]) => {
          ctx!.beginPath(); ctx!.moveTo(x + cs * dx, y); ctx!.lineTo(x, y); ctx!.lineTo(x, y + cs * dy); ctx!.stroke()
        })
      })
    },

    // 边缘智能：芯片电路
    'edge-ai'() {
      // 芯片主体
      const cx = w * 0.5, cy = h * 0.5
      const chipW = w * 0.28, chipH = h * 0.32
      ctx!.strokeStyle = 'rgba(79, 110, 247, 0.25)'
      ctx!.lineWidth = 1.5
      ctx!.strokeRect(cx - chipW / 2, cy - chipH / 2, chipW, chipH)
      // 内部网格
      for (let i = 1; i < 5; i++) {
        const x = cx - chipW / 2 + (chipW / 5) * i
        const y = cy - chipH / 2 + (chipH / 3) * (i % 3)
        ctx!.strokeStyle = 'rgba(79, 110, 247, 0.08)'
        ctx!.lineWidth = 0.5
        ctx!.beginPath(); ctx!.moveTo(x, cy - chipH / 2); ctx!.lineTo(x, cy + chipH / 2); ctx!.stroke()
      }
      // 电路引脚 + 流动数据
      const pins = [-1, -0.5, 0, 0.5, 1]
      pins.forEach((p, i) => {
        const y = cy + p * chipH * 0.4
        const startX = cx + chipW / 2
        const endX = w * 0.85
        ctx!.beginPath(); ctx!.moveTo(startX, y); ctx!.lineTo(endX, y)
        ctx!.strokeStyle = 'rgba(79, 110, 247, 0.12)'; ctx!.lineWidth = 1; ctx!.stroke()
        // 数据脉冲
        const t = ((time * 0.008 + i * 0.2) % 1)
        const px = startX + (endX - startX) * t
        circle(px, y, 2.5, 'rgba(79, 110, 247, ALPHA)', 0.8)

        const lx = cx - chipW / 2
        const elx = w * 0.15
        ctx!.beginPath(); ctx!.moveTo(lx, y); ctx!.lineTo(elx, y)
        ctx!.strokeStyle = 'rgba(79, 110, 247, 0.12)'; ctx!.stroke()
        const lt = ((time * 0.008 + i * 0.2 + 0.5) % 1)
        circle(lx - (lx - elx) * lt, y, 2.5, 'rgba(155, 89, 245, ALPHA)', 0.8)
      })
      // 芯片核心脉冲
      const pulse = Math.sin(time * 0.03) * 0.3 + 0.5
      glowCircle(cx, cy, 12, 'rgba(79, 110, 247, ALPHA)', pulse * 0.3)
    },

    // 语音与音频：声波
    'speech-audio'() {
      const cy = h * 0.5
      const barCount = 60
      const barW = (w * 0.85) / barCount
      const startX = w * 0.075
      for (let i = 0; i < barCount; i++) {
        const x = startX + i * barW
        const wave = Math.sin(i * 0.35 + time * 0.03) * Math.sin(i * 0.12 + time * 0.02)
        const barH = Math.abs(wave) * h * 0.32 + 3
        const hue = 230 + wave * 30
        const alpha = 0.25 + Math.abs(wave) * 0.55
        ctx!.fillStyle = `hsla(${hue}, 85%, 62%, ${alpha})`
        const r = barW * 0.3
        ctx!.beginPath()
        if (ctx!.roundRect) {
          ctx!.roundRect(x, cy - barH / 2, barW * 0.55, barH, r)
        } else {
          ctx!.rect(x, cy - barH / 2, barW * 0.55, barH)
        }
        ctx!.fill()
      }
      // 中心线
      ctx!.beginPath(); ctx!.moveTo(startX, cy); ctx!.lineTo(startX + barCount * barW, cy)
      ctx!.strokeStyle = 'rgba(79, 110, 247, 0.08)'; ctx!.lineWidth = 0.5; ctx!.stroke()
    },

    // 模型压缩：网格收缩
    'model-compression'() {
      // 大网格（压缩前）
      const bigN = 8, smallN = 4
      const progress = Math.sin(time * 0.012) * 0.5 + 0.5 // 0~1
      const cellW = w * 0.12, gap = 4
      // 左侧大网格
      const lx = w * 0.15, ly = h * 0.5
      for (let i = 0; i < bigN; i++) {
        for (let j = 0; j < bigN; j++) {
          const x = lx + (i - bigN / 2) * (cellW + gap)
          const y = ly + (j - bigN / 2) * (cellW * 0.6 + gap)
          const alpha = 0.15 + Math.sin(time * 0.02 + i + j) * 0.1
          // 部分"被剪枝"
          const pruned = (i + j) % 3 === 0 && progress > 0.3
          if (!pruned) {
            ctx!.fillStyle = `rgba(79, 110, 247, ${alpha})`
            ctx!.fillRect(x, y, cellW, cellW * 0.6)
            ctx!.strokeStyle = `rgba(79, 110, 247, ${alpha + 0.1})`
            ctx!.lineWidth = 0.5
            ctx!.strokeRect(x, y, cellW, cellW * 0.6)
          } else {
            ctx!.strokeStyle = `rgba(79, 110, 247, ${alpha * 0.3})`
            ctx!.lineWidth = 0.5
            ctx!.strokeRect(x, y, cellW, cellW * 0.6)
          }
        }
      }
      // 箭头
      const ax = w * 0.48
      ctx!.beginPath(); ctx!.moveTo(ax - 20, h * 0.5); ctx!.lineTo(ax + 20, h * 0.5)
      ctx!.strokeStyle = 'rgba(155, 89, 245, 0.4)'; ctx!.lineWidth = 2; ctx!.stroke()
      ctx!.beginPath(); ctx!.moveTo(ax + 12, h * 0.5 - 6); ctx!.lineTo(ax + 20, h * 0.5); ctx!.lineTo(ax + 12, h * 0.5 + 6)
      ctx!.stroke()
      // 右侧小网格（压缩后）
      const rx = w * 0.72
      const sCell = cellW * 1.4
      for (let i = 0; i < smallN; i++) {
        for (let j = 0; j < smallN; j++) {
          const x = rx + (i - smallN / 2) * (sCell + gap)
          const y = ly + (j - smallN / 2) * (sCell * 0.6 + gap)
          const alpha = 0.2 + Math.sin(time * 0.025 + i * j) * 0.12
          ctx!.fillStyle = `rgba(155, 89, 245, ${alpha})`
          ctx!.fillRect(x, y, sCell, sCell * 0.6)
          ctx!.strokeStyle = `rgba(155, 89, 245, ${alpha + 0.15})`
          ctx!.lineWidth = 1
          ctx!.strokeRect(x, y, sCell, sCell * 0.6)
        }
      }
    },

    // 图神经网络：消息传递
    'graph-nn'() {
      // 中心节点
      const cx = w * 0.5, cy = h * 0.5
      // 邻居节点
      const neighbors = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + time * 0.005
        const r = Math.min(w, h) * 0.28
        return { x: cx + Math.cos(angle) * r * 1.5, y: cy + Math.sin(angle) * r }
      })
      // 消息传递箭头（向中心）
      neighbors.forEach((n, i) => {
        const t = (time * 0.008 + i * 0.12) % 1
        // 连线
        ctx!.beginPath(); ctx!.moveTo(n.x, n.y); ctx!.lineTo(cx, cy)
        ctx!.strokeStyle = 'rgba(79, 110, 247, 0.1)'; ctx!.lineWidth = 1; ctx!.stroke()
        // 流动消息粒子
        const px = n.x + (cx - n.x) * t
        const py = n.y + (cy - n.y) * t
        const size = 2 + t * 2
        circle(px, py, size, 'rgba(79, 110, 247, ALPHA)', 0.3 + t * 0.5)
        // 邻居节点
        const pulse = Math.sin(time * 0.025 + i * 0.8) * 0.3 + 0.7
        circle(n.x, n.y, 5, 'rgba(79, 110, 247, ALPHA)', 0.3 * pulse)
        glowCircle(n.x, n.y, 5, 'rgba(79, 110, 247, ALPHA)', 0.15 * pulse)
      })
      // 中心节点（聚合后）
      const aggPulse = Math.sin(time * 0.035) * 0.3 + 0.8
      glowCircle(cx, cy, 10, 'rgba(155, 89, 245, ALPHA)', aggPulse * 0.35)
      circle(cx, cy, 8, 'rgba(155, 89, 245, ALPHA)', aggPulse)
      // 聚合波纹
      const waveR = (time * 0.5) % 80
      const waveAlpha = 0.2 * (1 - waveR / 80)
      ctx!.beginPath(); ctx!.arc(cx, cy, waveR, 0, Math.PI * 2)
      ctx!.strokeStyle = `rgba(155, 89, 245, ${waveAlpha})`; ctx!.lineWidth = 1; ctx!.stroke()
    },

    // 脑启发计算：神经元脉冲
    'brain-computing'() {
      // 神经元网络
      const neurons = Array.from({ length: 14 }, (_, i) => ({
        x: w * 0.1 + (w * 0.8) * ((i * 37 + 11) % 100) / 100,
        y: h * 0.15 + (h * 0.7) * ((i * 53 + 7) % 100) / 100,
        threshold: Math.random() * Math.PI * 2
      }))
      // 突触连接
      neurons.forEach((n, i) => {
        neurons.forEach((m, j) => {
          if (i >= j) return
          const dist = Math.hypot(n.x - m.x, n.y - m.y)
          if (dist < w * 0.25) {
            const spikePhase = Math.sin(time * 0.02 + i * 1.3 + j * 0.7)
            const alpha = spikePhase > 0.7 ? 0.3 : 0.06
            ctx!.beginPath(); ctx!.moveTo(n.x, n.y); ctx!.lineTo(m.x, m.y)
            ctx!.strokeStyle = `rgba(79, 110, 247, ${alpha})`
            ctx!.lineWidth = spikePhase > 0.7 ? 1.5 : 0.5
            ctx!.stroke()
          }
        })
      })
      // 脉冲神经元
      neurons.forEach((n, i) => {
        const spike = Math.sin(time * 0.025 + n.threshold + i * 0.9)
        const isSpiking = spike > 0.65
        if (isSpiking) {
          glowCircle(n.x, n.y, 6, 'rgba(155, 89, 245, ALPHA)', 0.4)
          // 脉冲波纹
          const waveR = (spike - 0.65) * 60
          ctx!.beginPath(); ctx!.arc(n.x, n.y, waveR, 0, Math.PI * 2)
          ctx!.strokeStyle = `rgba(155, 89, 245, ${0.3 * (1 - waveR / 30)})`
          ctx!.lineWidth = 1.5; ctx!.stroke()
        }
        circle(n.x, n.y, 4, isSpiking ? 'rgba(155, 89, 245, ALPHA)' : 'rgba(79, 110, 247, ALPHA)', isSpiking ? 0.9 : 0.35)
      })
    },

    // 3D 视觉：旋转点云
    '3d-vision'() {
      // 生成 3D 点云
      const points: { x: number; y: number; z: number }[] = []
      for (let i = 0; i < 200; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const r = 0.5 + Math.random() * 0.5
        points.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi)
        })
      }
      // 旋转
      const rotY = time * 0.012
      const rotX = 0.4
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const projected = points.map(p => {
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY
        const y1 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX
        const scale = 60 / (1.5 + z2)
        return {
          x: w * 0.5 + x1 * scale * Math.min(w, h) * 0.32,
          y: h * 0.5 + y1 * scale * Math.min(w, h) * 0.32,
          z: z2, scale
        }
      }).sort((a, b) => a.z - b.z)

      projected.forEach(p => {
        const depth = (p.z + 1) / 2
        const size = 1 + depth * 2.5
        const alpha = 0.15 + depth * 0.55
        const color = depth > 0.5
          ? `rgba(155, 89, 245, ${alpha})`
          : `rgba(79, 110, 247, ${alpha})`
        circle(p.x, p.y, size, color, 1)
      })
    }
  }

  function draw() {
    time++
    ctx!.clearRect(0, 0, w, h)
    const fn = animations[props.type]
    if (fn) fn()
    animId = requestAnimationFrame(draw)
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
.tech-anim-wrap {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(79, 110, 247, 0.04), rgba(155, 89, 245, 0.04));
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 2rem;
}

.tech-canvas {
  width: 100%;
  display: block;
}

.tech-anim-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tech-label {
  position: absolute;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  white-space: nowrap;
  animation: labelPulse 4s ease-in-out infinite;
  transform: translateX(-50%);
}

.lbl-blue {
  color: rgba(79, 110, 247, 0.75);
  background: rgba(79, 110, 247, 0.08);
  border: 1px solid rgba(79, 110, 247, 0.15);
}

.lbl-purple {
  color: rgba(155, 89, 245, 0.75);
  background: rgba(155, 89, 245, 0.08);
  border: 1px solid rgba(155, 89, 245, 0.15);
}

@keyframes labelPulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
</style>
