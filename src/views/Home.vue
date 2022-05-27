<template>
  <section class="pt-5 bg-sky-100 items-center">
      <div class="align-items-center">
            <div
              class="container justify-content-center align-items-center"
            >
              <div
                class="row mb-0 pb-0"
              >
                <div
                  class="col-12"
                >
                   <div class="p-0">
                    <h2 class="text-left text-lg mb-4">{{ $t('home.search') }}</h2>
                    <form>
                      <div class="row mb-3 pb-0">
                      <div class="col-md-6">
                        <div class="form-group" :class="{ error: v$.form.id.$errors.length }">
                            
                          <div class="input-group mb-3">
                          
                            <input type="text" class="form-control form-control-lg rounded-md border-y-0" :placeholder="$t('home.userid')" :label="$t('home.userid')"
                          v-model="v$.form.id.$model"
                          name="username"
                          autocomplete="on" />
                          </div>
                          <div class="input-errors mt-1 mb-3" v-for="(error, index) of v$.form.id.$errors" :key="index">
                            <div class="error-msg text-red-300"><i class="fas fa-exclamation-circle text-red-600 font-bold"></i> {{ error.$message }}</div>
                          </div>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group text-center">
                          <button type="button" :disabled="v$.form.$invalid" class="w-full h-12 px-6 text-white font-bold transition-colors duration-150 bg-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-900" @click="getPosts(v$.form.id.$model)"><i aria-hidden="true" class="fa fa-search"></i> {{ $t('home.btnSearch') }}</button>
                        </div>
                        </div>
                        </div>
                    </form>
                </div>
                </div>
              </div>

              

              
                <div v-if="loadedUserPosts">
                <table>
                  <thead>
                    <tr>
                      <th width="100px">ID</th>
                      <th width="100px">User ID</th>
                      <th>Title</th>
                      <th>Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in dataUserPosts" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.user_id }}</td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.body }}</td>
                      <td><button type="button" :disabled="v$.form.$invalid" class="w-full h-12 px-6 text-white font-bold transition-colors duration-150 bg-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-900" @click="getPostComments(item.id)"><i aria-hidden="true" class="fa fa-eye"></i> Comments</button></td>
                    </tr>
                  </tbody>
                </table>
                <div
                class="row mb-0 pb-0"
              >
                <div
                  class="col-12"
                >
                   <div class="p-0">
                    <hr class="my-5" />
                    <h2 class="text-left text-lg mb-4">Add User Post for User {{ form.id }}</h2>
                    <form>
                      <div class="row mb-3 pb-0">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="text-left text-lg mb-4">Title</label>
                          <div class="input-group mb-3">
                          
                            <input type="text" class="form-control form-control-lg rounded-md border-y-0" :placeholder="Title" label="Title"
                          v-model="post.title"
                          name="title"
                          autocomplete="on" />
                          </div>
                          
                        </div>
                        </div>
                        <div class="col-md-12">
                        <div class="form-group">
                          <label class="text-left text-lg mb-4">Body</label>
                          <div class="input-group mb-3">
                          
                            <input type="text" class="form-control form-control-lg rounded-md border-y-0" :placeholder="Body" label="Body"
                          v-model="post.body"
                          name="body"
                          autocomplete="on" />
                          </div>
                          
                        </div>
                        </div>
                        <div class="col-md-12">
                        <div class="form-group text-center">
                          <button type="button" :disabled="v$.form.$invalid" class="w-full h-12 px-6 text-white font-bold transition-colors duration-150 bg-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-900" @click="addPost()"><i aria-hidden="true" class="fa fa-plus"></i> {{ $t('home.btnAddPost') }}</button>
                        </div>
                        </div>
                        </div>
                    </form>
                    <div v-if="showCreateUserPostsResponse">
                      {{createUserPostsResponse}}
                    </div>
                </div>
                </div>
              </div>
              </div>
              <div v-if="loadedPostComments">
                <table>
                  <thead>
                    <tr>
                      <th width="100px">ID</th>
                      <th width="100px">Post ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in dataPostComments" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.post_id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.body }}</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="col-12"
                >
                   <div class="p-0">
                    <hr class="my-5" />
                    <h2 class="text-left text-lg mb-4">Add Comment for  Post {{ post_id }}</h2>
                    <form>
                      <div class="row mb-3 pb-0">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="text-left text-lg mb-4">Name</label>
                          <div class="input-group mb-3">
                          
                            <input type="text" class="form-control form-control-lg rounded-md border-y-0" :placeholder="Name" label="Name"
                          v-model="comment.name"
                          name="name"
                          autocomplete="on" />
                          </div>
                          
                        </div>
                        </div>
                        <div class="col-md-12">
                        <div class="form-group">
                          <label class="text-left text-lg mb-4">Email</label>
                          <div class="input-group mb-3">
                          
                            <input type="text" class="form-control form-control-lg rounded-md border-y-0" :placeholder="Email" label="Email"
                          v-model="comment.email"
                          name="name"
                          autocomplete="on" />
                          </div>
                          
                        </div>
                        </div>
                        <div class="col-md-12">
                        <div class="form-group">
                          <label class="text-left text-lg mb-4">Body</label>
                          <div class="input-group mb-3">
                          
                            <input type="text" class="form-control form-control-lg rounded-md border-y-0" :placeholder="Body" label="Body"
                          v-model="comment.body"
                          name="body"
                          autocomplete="on" />
                          </div>
                          
                        </div>
                        </div>
                        <div class="col-md-12">
                        <div class="form-group text-center">
                          <button type="button" :disabled="v$.form.$invalid" class="w-full h-12 px-6 text-white font-bold transition-colors duration-150 bg-sky-500 rounded-lg focus:shadow-outline hover:bg-sky-900" @click="addPostComment()"><i aria-hidden="true" class="fa fa-plus"></i> Add Comment</button>
                        </div>
                        </div>
                        </div>
                    </form>
                    <div v-if="showCreateUserPostsResponse">
                      {{createUserPostsResponse}}
                    </div>
                </div>
                </div>
                </div>


            </div>
          </div>    
    </section>
</template>

<script>
// import { ref, reactive, onMounted } from 'vue';
import UserService from '@/services/User.service';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'

export default {

  setup () {
    return { v$: useVuelidate() }
  },
  name: 'home',
  data() {
    return {
      dataUserPosts: [],
      loadedUserPosts: false,
      createUserPostsResponse: {},
      showCreateUserPostsResponse: false,
      dataPostComments: [],
      loadedPostComments: false,
      createPostCommentResponse: false,
      showCreatePostCommentResponse: false,
      form: {
        id: '',
      },
      post: {
        title:'',
        body: '',
      },
      post_id: 0,
      comment: {
        name:'',
        email:'',
        body: '',
      }
    };
  },
  methods: {

    // get user posts
    getPosts(id){

      const response = UserService.getPosts(id).then(
        response => {
          
          this.dataUserPosts = response;
          console.log('getPosts', this.dataUserPosts)

          this.loadedUserPosts = true;
          
        },
        error => {
          
        }
      );
    },
    // get user posts
    addPost(){

      console.log('add post', this.post);

      const response = UserService.createPost(this.form.id, this.post).then(
        response => {
          
          this.createUserPostsResponse = response;
          this.showCreateUserPostsResponse = true;

        },
        error => {
          this.createUserPostsResponse = error;
          this.showCreateUserPostsResponse = true;          
        }
      );
    },

    // get a post comments
    getPostComments(id){

      this.post_id = id;

      const response = UserService.getPostsComments(id).then(
        response => {
          
          this.dataPostComments = response;
          console.log('getPosts', this.dataPostComments)

          this.loadedPostComments = true;
          
        },
        error => {
          
        }
      );
    },

    // get post comment
    addPostComment(){

      const response = UserService.createPostComment(this.post_id, this.comment).then(
        response => {
          
          this.createPostCommentResponse = response;
          this.showCreatePostCommentResponse = true;

        },
        error => {
          this.createPostCommentResponse = error;
          this.showCreatePostCommentResponse = true;          
        }
      );
    },

  },
  validations() {
    return {
      form: {
        id: {
           required:  helpers.withMessage(this.$t('validation.required'), required),
        },
      },
    }
  },
};
</script>

<style>


</style>