import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      name: 'Layout',
      redirect: '/',
      component: () => import(/* webpackChunkName: "navigator" */ '@/components/layout/Layout'),
      children: [
        {
          path: '/',
          name: 'Index',
          redirect: '/info',
          // component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index')
        },
        {
          path: '/info',
          name: 'Info',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Info')
        },
        {
          path: '/account',
          name: 'Account',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children:[
            {
              path: '/account/admin',
              redirect: '/account/admin/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'account_admin_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/admin/List'),
                },
                {
                  path: 'add',
                  name: 'account_admin_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/admin/Details'),
                },
                {
                  path: ':id',
                  name: 'account_admin_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/admin/Details'),
                }
              ]
            },
            {
              path: '/account/teacher',
              redirect: '/account/teacher/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'account_teacher_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/teacher/List'),
                },
                {
                  path: 'add',
                  name: 'account_teacher_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/teacher/Details'),
                },
                {
                  path: ':id',
                  name: 'account_teacher_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/teacher/Details'),
                }
              ]
            },
            {
              path: '/account/student',
              redirect: '/account/student/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'account_student_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/student/List'),
                },
                {
                  path: 'add',
                  name: 'account_student_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/student/Details'),
                },
                {
                  path: ':id',
                  name: 'account_student_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/student/Details'),
                }
              ]
            },
            {
              path: '/account/general',
              redirect: '/account/general/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'account_general_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/general/List'),
                },
                {
                  path: 'add',
                  name: 'account_general_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/general/Details'),
                },
                {
                  path: ':id',
                  name: 'account_general_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/general/Details'),
                }
              ]
            },
            {
              path: '/account/role',
              redirect: '/account/role/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'account_role_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/role/List'),
                },
                {
                  path: 'add',
                  name: 'account_role_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/role/Details'),
                },
                {
                  path: ':id',
                  name: 'account_role_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/account/role/Details'),
                }
              ]
            },
          ],
        },
        {
          path: '/notice',
          redirect: '/notice/list',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: 'list',
              name: 'notice_list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/notice/List'),
            },
            {
              path: 'add',
              name: 'notice_add',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/notice/Details'),
            },
            {
              path: ':id',
              name: 'notice_details',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/notice/Details'),
            }
          ]
        },
        {
          path: '/course',
          redirect: '/course/list',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: 'list',
              name: 'course_list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/List'),
            },
            {
              path: 'add',
              name: 'course_add',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/Details'),
            },
            {
              path: ':id',
              name: 'course_details',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/Details'),
            }
          ]
        },
        {
          path: '/activity',
          redirect: '/activity/list',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: 'list',
              name: 'activity_list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/List'),
            },
            {
              path: 'add',
              name: 'activity_add',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/Details'),
            },
            {
              path: ':id',
              name: 'activity_details',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/Details'),
            }
          ]
        },
        // {
        //   path: '/basic',
        //   name: 'Basic',
        //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //   children:[
        //     {
        //       path: '/basic/college',
        //       redirect: '/basic/college/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'basic_college_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/college/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'basic_college_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/college/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'basic_college_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/college/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/basic/department',
        //       redirect: '/basic/department/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'basic_department_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/department/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'basic_department_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/department/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'basic_department_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/department/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/basic/major',
        //       redirect: '/basic/major/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'basic_major_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/major/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'basic_major_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/major/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'basic_major_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/major/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/basic/direction',
        //       redirect: '/basic/direction/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'basic_direction_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/direction/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'basic_direction_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/direction/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'basic_direction_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/direction/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/basic/grade',
        //       redirect: '/basic/grade/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'basic_grade_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/grade/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'basic_grade_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/grade/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'basic_grade_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/grade/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/basic/teacher',
        //       redirect: '/basic/teacher/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'basic_teacher_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/teacher/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'basic_teacher_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/teacher/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'basic_teacher_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/basic/teacher/Details'),
        //         }
        //       ]
        //     }
        //   ],
        // },
        // {
        //   path: '/course',
        //   name: 'Course',
        //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //   children:[
        //     {
        //       path: '/course/class',
        //       redirect: '/course/class/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'course_class_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/class/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'course_class_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/class/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'course_class_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/class/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/course/store',
        //       redirect: '/course/store/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'course_store_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/store/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'course_store_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/store/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'course_store_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/store/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/course/record',
        //       redirect: '/course/record/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'course_record_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/record/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'course_record_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/record/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'course_class_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/course/class/Details'),
        //         }
        //       ]
        //     },
        //   ],
        // },
        // {
        //   path: '/activity',
        //   name: 'Activity',
        //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //   children:[
        //     {
        //       path: '/activity/second',
        //       redirect: '/activity/second/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'activity_second_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/second/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'activity_second_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/second/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'activity_second_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/second/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/activity/community',
        //       redirect: '/activity/community/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'activity_community_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/community/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'activity_community_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/community/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'activity_community_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/community/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/activity/competition',
        //       redirect: '/activity/competition/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'activity_competition_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/competition/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'activity_competition_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/competition/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'activity_competition_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/competition/Details'),
        //         }
        //       ]
        //     },
        //     {
        //       path: '/activity/other',
        //       redirect: '/activity/other/list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //       children: [
        //         {
        //           path: 'list',
        //           name: 'activity_other_list',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/other/List'),
        //         },
        //         {
        //           path: 'add',
        //           name: 'activity_other_add',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/other/Details'),
        //         },
        //         {
        //           path: ':id',
        //           name: 'activity_other_details',
        //           component: () => import(/* webpackChunkName: "navigator" */ '@/views/activity/other/Details'),
        //         }
        //       ]
        //     }
        //   ],
        // },
        {
          path: '/blogroll',
          redirect: '/blogroll/list',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: 'list',
              name: 'blogroll_list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/blogroll/List'),
            },
            {
              path: 'add',
              name: 'blogroll_add',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/blogroll/Details'),
            },
            {
              path: ':id',
              name: 'blogroll_details',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/blogroll/Details'),
            }
          ]
        },
        // {
        //   path: '/living',
        //   redirect: '/living/list',
        //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
        //   children: [
        //     {
        //       path: 'list',
        //       name: 'living_list',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/living/List'),
        //     },
        //     {
        //       path: 'add',
        //       name: 'living_add',
        //       component: () => import(/* webpackChunkName: "navigator" */ '@/views/living/Details'),
        //     }
        //   ]
        // },
        {
          path: '/logs',
          name: 'Logs',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children:[
            {
              path: '/logs/system',
              redirect: '/logs/system/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'logs_system_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/logs/system/List'),
                },
                // {
                //   path: 'add',
                //   name: 'logs_system_add',
                //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/logs/system/Details'),
                // },
                // {
                //   path: ':id',
                //   name: 'logs_system_details',
                //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/logs/system/Details'),
                // }
              ]
            },
            {
              path: '/logs/login',
              redirect: '/logs/login/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'logs_login_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/logs/login/List'),
                },
                // {
                //   path: 'add',
                //   name: 'logs_login_add',
                //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/logs/login/Details'),
                // },
                // {
                //   path: ':id',
                //   name: 'logs_login_details',
                //   component: () => import(/* webpackChunkName: "navigator" */ '@/views/logs/login/Details'),
                // }
              ]
            }
          ],
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "navigator" */ '@/views/Login')
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "navigator" */ '@/views/404')
    }
  ]
})
