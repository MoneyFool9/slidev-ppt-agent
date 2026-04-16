# Page Template: Detail Two-Column

Design intent: Two glass cards side-by-side with internal sub-sections. Uses CSS variables for dark/light mode.

```md
---
transition: slide-left
---

<div class="section-bar">

# 2. 核心组件：A & B

</div>

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="glass-card">
  <div class="flex items-center gap-3 mb-4">
    <div class="icon-box"><mdi-cog class="text-base" /></div>
    <div>
      <div class="font-semibold" style="color:var(--ppt-primary)">Component A</div>
      <div class="text-xs" style="color:var(--ppt-text-muted)">执行引擎与调度中枢</div>
    </div>
  </div>

  <div class="space-y-3">
    <div>
      <div class="font-medium text-sm flex items-center gap-2" style="color:var(--ppt-text)">
        <mdi-circle-small style="color:var(--ppt-primary)" /> 子模块一
      </div>
      <div class="text-xs ml-5" style="color:var(--ppt-text-body)">简要描述该子模块的职责和价值。</div>
    </div>
    <div>
      <div class="font-medium text-sm flex items-center gap-2" style="color:var(--ppt-text)">
        <mdi-circle-small style="color:var(--ppt-primary)" /> 子模块二
      </div>
      <div class="text-xs ml-5" style="color:var(--ppt-text-body)">简要描述。</div>
    </div>
  </div>
</div>

<div class="glass-card">
  <div class="flex items-center gap-3 mb-4">
    <div class="icon-box--secondary" style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--ppt-icon-bg-secondary)">
      <mdi-brain class="text-base" style="color:var(--ppt-secondary)" />
    </div>
    <div>
      <div class="font-semibold" style="color:var(--ppt-secondary)">Component B</div>
      <div class="text-xs" style="color:var(--ppt-text-muted)">认知与长期规划大脑</div>
    </div>
  </div>

  <div class="space-y-3">
    <div>
      <div class="font-medium text-sm flex items-center gap-2" style="color:var(--ppt-text)">
        <mdi-circle-small style="color:var(--ppt-secondary)" /> 子模块一
      </div>
      <div class="text-xs ml-5" style="color:var(--ppt-text-body)">简要描述。</div>
    </div>
    <div>
      <div class="font-medium text-sm flex items-center gap-2" style="color:var(--ppt-text)">
        <mdi-circle-small style="color:var(--ppt-secondary)" /> 子模块二
      </div>
      <div class="text-xs ml-5" style="color:var(--ppt-text-body)">简要描述。</div>
    </div>
  </div>
</div>

</div>

<!--
演讲者备注：对比两个核心组件的职责分工与协作关系。
-->
```
