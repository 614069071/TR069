<template>
  <div class="control-buttons"><slot></slot></div>
</template>

<style lang="less">
.control-buttons {
  display: flex;

  & > * {
    height: 14px;
    line-height: 14px;
    cursor: pointer;
    display: flex;
  }

  & > * + *::before {
    content: "";
    display: inline-block;
    margin: 0 10px;
    width: 1px;
    height: 14px;
    background-color: #e5e6e8;
  }
}
</style>
