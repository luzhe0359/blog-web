<template>
  <q-page class="q-pa-md">
    <!-- 面包屑 -->
    <Breadcrumbs />
    <!-- 主体 -->
    <q-card
      :bordered="false"
      style="box-shadow: none;"
    >
      <!-- 搜索框 -->
      <q-card-section class="q-px-none q-py-sm">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-sm row items-end"
        >
          <q-input
            type="text"
            v-model="username"
            label="用户名"
            class="col-lg-3 col-md-3 col-sm-6 col-xs-10"
          />
          <q-input
            type="text"
            v-model="nickname"
            label="昵称"
            class="col-lg-3 col-md-3 col-sm-6 col-xs-10"
          />
          <q-btn
            label="查 询"
            type="submit"
            color="primary"
            :disable="searchLoading"
            :loading="searchLoading"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
          <q-btn
            label="重 置"
            type="reset"
            color="grey"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <!-- 表格 -->
        <q-table
          color="primary"
          :bordered="false"
          card-style="box-shadow: none;"
          row-key="id"
          :data="userData"
          :columns="UserColumns"
          :loading="loading"
          :pagination.sync="pagination"
          rows-per-page-label="每页条数:"
          :rows-per-page-options="[5, 10, 20, 50, 0]"
          :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => `${firstRowIndex}-${endRowIndex} / ${totalRowsNumber}`"
          no-data-label="很抱歉, 没有查询到您想要的结果 . . ."
          @request="request"
          binary-state-sort
        >
          <!-- 无数据 -插槽 -->
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center q-gutter-sm text-warning">
              <q-icon
                v-show="!loading"
                size="2em"
                name="sentiment_dissatisfied"
              />
              <span>
                {{ message }}
              </span>
            </div>
          </template>
          <!-- 表格内容 -角色插槽 -->
          <template v-slot:body-cell-role="props">
            <q-td :props="props">
              <q-toggle
                color="green"
                true-value='SVIP'
                false-value='VIP'
                checked-icon="check"
                unchecked-icon="clear"
                v-model="props.row.role"
                :label="props.row.role"
                @input="roleToggle(props.row._id, $event, props.row)"
              />
            </q-td>
          </template>
          <!-- 表格内容 -性别插槽 -->
          <template v-slot:body-cell-gender="props">
            <q-td :props="props">
              {{props.row.gender | userGender}}
            </q-td>
          </template>
          <!-- 表格内容 -头像插槽 -->
          <template v-slot:body-cell-avatar="props">
            <q-td :props="props">
              <q-avatar
                round
                size="48px"
              >
                <img :src="`${$url}${props.row.avatar}`" />
              </q-avatar>
            </q-td>
          </template>
          <!-- 表格内容 -操作插槽 -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                icon="edit"
                size="sm"
                flat
                dense
                @click="$q.notify('开发中 .')"
              />
              <q-btn
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                dense
                @click="deleteUser(props.row._id)"
              />
            </q-td>
          </template>
          <!-- 表格内容 -简介插槽 -->
          <!-- <template v-slot:body-cell-about="props">
            <q-td :props="props">
              <div class="fit flex flex-center text-center non-selectable q-pa-md">
                {{props.row.about}}
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  {{props.row.about}}
                </q-tooltip>
              </div>
            </q-td>
          </template> -->
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.vue'
import { findUserList, EditUserById, deleteUserById } from 'src/api/user.js'
import { date } from 'quasar'

export default {
  name: "UserList",
  components: {
    Breadcrumbs
  },
  data () {
    return {
      username: '', // 用户名(搜索)
      nickname: '', // 昵称(搜索)
      loading: true, // 表格loading
      pagination: {
        sortBy: 'createTime', // 排序方式, 按照哪个字段排序
        descending: true, // 是否按降序排序
        page: 1, // 页码
        rowsPerPage: 10, // 每页多少行, 0表示无限
        rowsNumber: 10 // 总行数
      },
      UserColumns: [
        {
          name: 'username', // 唯一的ID
          required: true, // （可选）如果我们使用可见列，这个列将始终可见
          label: '用户名', // 头部标签
          align: 'left', // 对齐方式
          field: 'username', // 行对象属性以确定此列的值，或field: row => row.some.nested.prop
          format: val => `${val}`, // （可选）您可以使用函数格式化数据
          sortable: true // （可选）告诉QTable你想要这个列可排序
        },
        { name: 'nickname', label: '昵称', field: 'nickname', align: 'center', sortable: true },
        { name: 'role', label: '角色', field: 'role', align: 'center', sortable: true },
        { name: 'email', label: '邮箱', field: 'email', align: 'center', sortable: true },
        { name: 'age', label: '年龄', field: 'age', align: 'center', sortable: true },
        { name: 'gender', label: '性别', field: 'gender', align: 'center', sortable: true },
        { name: 'avatar', label: '头像', field: 'avatar', align: 'center' },
        { name: 'createTime', label: '创建时间', field: 'createTime', align: 'center', sortable: true, format: val => date.formatDate(val, 'YYYY-MM-DD HH:mm:ss') },
        { name: 'about', label: '个人简介', field: 'about', align: 'center' },
        { name: 'action', label: '操作', field: 'action', align: 'center' }
      ],
      userData: [], // 用户列表
      searchLoading: false // 查询loading
    }
  },
  mounted () {
    this.request({
      pagination: this.pagination
    })
  },
  methods: {
    // 查找用户列表
    request (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination

      this.loading = true
      let params = {
        username: this.username,
        nickname: this.nickname,
        pageNum: page,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        descending: descending
      }
      findUserList(params).then(res => {
        this.searchLoading = false // 关闭查询按钮loading

        this.userData = res.data
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.pagination.rowsNumber = res.total

        this.loading = false
      }).catch(err => {
        throw new Error(err)
      })
    },
    // 查询
    onSubmit () {
      this.searchLoading = true
      this.request({
        pagination: this.pagination
      })
    },
    // 重置
    onReset () {
      this.username = ''
      this.nickname = ''
      this.searchLoading = false
    },
    // 角色状态改变
    roleToggle (_id, role, row) {
      this.$q.dialog({
        title: '编辑',
        message: '确定要修改用户权限吗?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.loading = true
        EditUserById(_id, { role }).then(res => {
          this.loading = false
          // 修改成功
          this.$q.notify({
            message: res.msg,
            color: 'primary'
          })
        }).catch(err => {
          this.loading = false
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
        row.role = role === 'SVIP' ? 'VIP' : 'SVIP'
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    // 删除用户
    deleteUser (_id) {
      this.$q.dialog({
        title: '删除',
        message: '确定要删除该用户吗?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        deleteUserById(_id + '1').then((res) => {
          this.request({
            pagination: this.pagination
          })
          // 删除成功
          this.$q.notify({
            message: res.msg,
            color: 'primary'
          })
        }).catch((err) => {
          throw new Error(err)
        })
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>