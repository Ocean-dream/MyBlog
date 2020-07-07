<template>
    <div>
        <h3 style="margin-bottom:0;">新型冠状病毒科普</h3>
        <div class="sen_content">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item, index) in questionData" :key="index" :v-for="index" :title="item.classify" :name="index">
             <div class="son_item">
                <van-collapse v-model="active" accordion>
                <van-collapse-item v-for="(items, index) in item.questions" :key="index" :v-for="index" :title="items.question" :name="index">
                  <div>
                    <span style="font-size:3vw;">{{items.answer}}</span>
                    <a style="font-size:3vw;" :href="items.ref_url">查看更多</a>
                  </div>
                </van-collapse-item>
              </van-collapse>
             </div>
            </van-collapse-item>
          </van-collapse>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: -1,
      active: -1,
      questionData: [
        {
          classify: '了解新型冠状病毒?',
          questions: [
            {
              question: '疫情爆发 如何与动物们相处?',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物、...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处?',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处?',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处?',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处?',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处?',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处?',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            }
          ]
        },
        {
          classify: '预防冠状病毒?',
          questions: [
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            }
          ]
        },
        {
          classify: '公司注意事项?',
          questions: [
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            }
          ]
        },
        {
          classify: '居家注意事项?',
          questions: [
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            }
          ]
        },
        {
          classify: '公共交通注意事项?',
          questions: [
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            },
            {
              question: '疫情爆发 如何与动物们相处',
              answer: '武汉新型冠状病毒性肺炎疫情爆发再次将病毒来源指向了动物，一时间竹鼠、獾、蛇、水貂等成为怀毒、马尔堡病毒、尼帕病毒、SARS冠状病毒病毒，甚至武汉新型冠状病毒...',
              ref_url: 'http://www.cast.org.cn/art/2020/2/9/art_618_111083.html'
            }
          ]
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
.sen_content {
  .van-collapse{
    .van-cell__title{
      text-align: left;
      span{
        color:green;
      }
    }
    .van-collapse-item__content{
      padding-top: 0;
      text-align: left;
      .son_item{
        .van-cell__title{
          text-align: left;
          span{
            color:purple;
          }
        }
      }
    }
  }
}
</style>
