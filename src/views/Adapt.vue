<template>
  <div class="adapt">
    212222123
    <div
      v-if="data.length"
      class="content"
      v-for="(item, idx) in data.paragraphDtos[0].questionDtos"
      :key="item.questionId"
      v-show="changeItem(item.z)"
    >
      <span class="title">{{ item.questionName }}</span>
      <van-checkbox-group
        v-if="item.questionType === 'CHECK_BOX'"
        v-model="item.answer"
        direction="horizontal"
      >
        <van-checkbox
          v-for="(itemChild, index) in item.answerDtos"
          :key="index"
          :name="itemChild.answerName"
          @click="value => clickCheckBox(idx, index)"
        >
          {{ itemChild.answerValue }}
        </van-checkbox>
      </van-checkbox-group>
      <van-radio-group
        v-if="item.questionType === 'RADIO'"
        v-model="item.answer"
      >
        <van-radio
          v-for="(itemChild, index) in item.answerDtos"
          :key="index"
          :name="itemChild.answerName"
        >
          {{ itemChild.answerValue }}
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, ref, onMounted } from 'vue'
  export interface State {
    count: number
    double?: number
    init: number
  }

  export default defineComponent({
    name: 'Home',
    setup() {
      const data: any = reactive({})

      onMounted(() => {
        console.log('test')
        // console.log(areaList)
        // console.log(data.paragraphDtos[0])
      })

      const changeItem = (item: any): boolean => {
        console.log(item)
        if (item) {
          let bool = false
          if (item.hyf === 'H') {
            for (const i of item.f) {
              console.log(data.paragraphDtos[0].questionDtos[i.sort].answer)
              console.log(i.answer)
              if (
                data.paragraphDtos[0].questionDtos[i.sort].answer === i.answer
              ) {
                bool = true
                break
              }
            }
          }
          return bool
        } else {
          return true
        }
      }

      const clickCheckBox = (idx: number, index: number) => {
        const arr: string[] = []
        let bool = false
        for (const i of data.paragraphDtos[0].questionDtos[idx].answerDtos) {
          if (i.isMutex) {
            arr.push(i.answerName)
          }
        }
        const answer = data.paragraphDtos[0].questionDtos[idx].answer
        for (const i of answer) {
          if (arr.includes(i)) {
            bool = true
            break
          }
        }
        if (bool) {
          data.paragraphDtos[0].questionDtos[idx].answer = [
            data.paragraphDtos[0].questionDtos[idx].answerDtos[index].answerName
          ]
        }
      }

      return {
        data,
        clickCheckBox,
        changeItem
      }
    }
  })
</script>

<style lang="scss" scoped>
  .adapt {
    padding: 0 10px;
    .title {
      display: block;
      text-align: left;
      margin: 10px 0;
    }
  }
</style>
