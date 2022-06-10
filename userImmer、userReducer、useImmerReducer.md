<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Title：# useImmer、useReducer、useImmerReducer](#title-useimmerusereduceruseimmerreducer)
  - [不可变数据 ：Immutable Data](#%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%95%B0%E6%8D%AE-immutable-data)
  - [1. userImmer](#1-userimmer)
  - [2. useReducer](#2-usereducer)
  - [3. useImmerReducer](#3-useimmerreducer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Title：# useImmer、useReducer、useImmerReducer

## 不可变数据 ：Immutable Data

- 当修改一个数据的时候，这个数据会给你返回一个新的引用，而自己的引用保持不变；

- 对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象；

## 1. userImmer

```markdown
定义数据： const [xxx, setXxx] = useImmer(…)
修改数据： setXxx(draft => {})
```

## 2. useReducer

```markdown
const reducer = (state, action) => {
    // 跟不同的action，更新state
}
const initialValue = {count: 0}// state的初始值
const init = (initialCount) => { // 惰性初始化state的初始值
    return {count: initialCount}
}
const [state, dispatch] = useReducer(reducer, initialValue, init)

// dispath
dispatch('add')
dispatch('add', payload: initialCount)
```

## 3. useImmerReducer

```markdown
const reducer = (draft, action) => {
    // 跟不同的action，改动draft来更新state
}

const [xxx, setXXX] = useImmerReducer(reducer, initialState, init);
```
