<template>
  <div class="host-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>关键指标</span>
      </div>
      <div class="portrait">
         <div class="indicators-age" style="border: 2px solid red;">
            年龄分布
         </div>
        <el-row>
          <el-col :span="12">
            <div class="indicators-sex" style="border: 2px solid blue;">
              性别占比
            </div>
          </el-col>
          <el-col :span="12">
            <div class="indicators-identity" :formatter="formatter" style="border: 2px solid green;">
              社会身份
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div class="separator" style="height: 30px"></div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div style="display: flex; align-items: center">
          <img
            src="../../assets/images/unit/TOP10.png"
            style="margin-right: 10px"
            alt=""
          />
          <span>社区居民活跃度</span>
        </div>
      </div>
      <div class="block">
        <el-table :data="tableData" style="width: 100%" height="300">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="活动列表"></el-form-item>
                <el-form-item
                  v-for="item in props.row.activityList"
                  :key="item.guid"
                >
                  <el-row>
                    <el-col :span="6">
                      <span>{{ item.ac_name }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ac_address }}</span>
                    </el-col>
                    <el-col :span="6">
                      <span>{{ item.ac_begin_time }}</span>
                    </el-col>
                    <el-col :span="6"></el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="cm_residents_name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_age" label="年龄" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_sex" label="性别" width="120">
          </el-table-column>
          <el-table-column prop="cm_residents_place" label="籍贯" width="120">
          </el-table-column>
          <el-table-column
            prop="cm_residents_identity"
            label="身份"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_phone"
            label="联系方式"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_paticipate"
            label="参与次数"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="cm_residents_address"
            label="居住地址"
            width="500"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Fund",
  data() {
    return {
       tableData: [
        {
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },{
          cm_residents_id: "201621323",
          cm_residents_name: "王小虎",
          cm_residents_age: "18",
          cm_residents_sex: "1",
          cm_residents_place: "广东珠海",
          cm_residents_phone: "12345678910",
          cm_residents_identity: "1",
          cm_residents_address: "广东省珠海市香洲区金凤路10号",
          cm_residents_paticipate: "5",
          cm_guid: "社区guid",
          activityList: [
            {
              guid: "12334142312",
              ac_name: "活动1",
              ac_address: "地址1",
              ac_begin_time: "时间1",
            },
            {
              guid: "12334142312",
              ac_name: "活动2",
              ac_address: "地址2",
              ac_begin_time: "时间2",
            },
            {
              guid: "12334142312",
              ac_name: "活动3",
              ac_address: "地址3",
              ac_begin_time: "时间3",
            },
            {
              guid: "12334142312",
              ac_name: "活动4",
              ac_address: "地址4",
              ac_begin_time: "时间4",
            },
            {
              guid: "12334142312",
              ac_name: "活动5",
              ac_address: "地址5",
              ac_begin_time: "时间5",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
  @import '../../styles/personnel/index.less';
</style>

