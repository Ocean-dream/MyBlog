import Mock from 'mockjs'

Mock.mock('/nav/getlist', 'get', function (option) {
  return Mock.mock({
    ret_data: {
      'platforms': [
        {
          'id': 1,
          'name': 'mobius',
          'cname': '默比优斯',
          'entity': 'platforms',
          'level': 'L0',
          'merchants': [
            {
              'id': 2,
              'name': 'merchants_01',
              'cname': '商户xx01药房',
              'entity': 'merchants',
              'level': 'L1',
              'subsection': [
                {
                  'id': 3,
                  'name': 'merchants_01_1',
                  'cname': '商户xx01_01药房',
                  'entity': 'subsection',
                  'level': 'L2',
                  'stores': [
                    {
                      'id': 6,
                      'name': 'stores_01_01',
                      'cname': '门店xx01_01_01店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 7,
                      'name': 'stores_02_02',
                      'cname': '门店xx02_02_02店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 8,
                      'name': 'stores_03_03',
                      'cname': '门店xx03_03_03店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 9,
                      'name': 'stores_04_04',
                      'cname': '门店xx04_04_04店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 10,
                      'name': 'stores_05_05',
                      'cname': '门店xx01_05_05店',
                      'entity': 'stores',
                      'level': 'L3'
                    }
                  ]
                },
                {
                  'id': 4,
                  'name': 'merchants_01_2',
                  'cname': '商户xx01_02药房',
                  'entity': 'subsection',
                  'level': 'L2',
                  'stores': [
                    {
                      'id': 11,
                      'name': 'stores_01_01',
                      'cname': '门店xx02_01店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 12,
                      'name': 'stores_02_02',
                      'cname': '门店xx02_02店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 13,
                      'name': 'stores_03_03',
                      'cname': '门店xx02_03店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 14,
                      'name': 'stores_04_04',
                      'cname': '门店xx02_04店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 15,
                      'name': 'stores_04_05',
                      'cname': '门店xx02_05店',
                      'entity': 'stores',
                      'level': 'L3'
                    }
                  ]
                },
                {
                  'id': 5,
                  'name': 'merchants_01_3',
                  'cname': '商户xx01_03药房',
                  'entity': 'subsection',
                  'level': 'L2',
                  'stores': [
                    {
                      'id': 16,
                      'name': 'stores_16',
                      'cname': '门店xx03_01店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 17,
                      'name': 'stores_17',
                      'cname': '门店xx03_02店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 18,
                      'name': 'stores_18',
                      'cname': '门店xx03_03店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 19,
                      'name': 'stores_19',
                      'cname': '门店xx03_04店',
                      'entity': 'stores',
                      'level': 'L3'
                    },
                    {
                      'id': 20,
                      'name': 'stores_20',
                      'cname': '门店xx03_05店',
                      'entity': 'stores',
                      'level': 'L3'
                    }
                  ]
                }
              ]
            },
            {
              'id': 30,
              'name': 'merchants_02',
              'cname': '商户xx02药房',
              'entity': 'merchants',
              'level': 'L1',
              'stores': [
                {
                  'id': 31,
                  'name': 'stores_01_01',
                  'cname': '门店xx01_01_01店',
                  'entity': 'stores',
                  'level': 'L3'
                },
                {
                  'id': 32,
                  'name': 'stores_02_02',
                  'cname': '门店xx02_02_02店',
                  'entity': 'stores',
                  'level': 'L3'
                },
                {
                  'id': 33,
                  'name': 'stores_03_03',
                  'cname': '门店xx03_03_03店',
                  'entity': 'stores',
                  'level': 'L3'
                },
                {
                  'id': 34,
                  'name': 'stores_04_04',
                  'cname': '门店xx04_04_04店',
                  'entity': 'stores',
                  'level': 'L3'
                },
                {
                  'id': 35,
                  'name': 'stores_05_05',
                  'cname': '门店xx01_05_05店',
                  'entity': 'stores',
                  'level': 'L3'
                }
              ]
            }
          ]
        }
      ]
    },
    ret_code: 0,
    ret_msg: 'success'
  })
})
