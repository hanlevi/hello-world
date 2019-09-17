<template>
<div class="home">
  <div class="jumbotron jumbotron-fluid" style="margin-top: 0px; padding-top: 0px; padding-bottom: 10px; background-color : rgb(41, 237, 204)">
  <div class="container" >
  <div class="display-4">
      
      <img  src="../assets/Yes.png" width="325" height="175">
  </div>
    <p class="lead">"Find and compare the prepaid cellphone plan that best fits you".</p>
  </div>
  </div>
  
   <div  class="row">
     <div class="col-sm-4"></div>
     <date-picker v-model="value1" valueType="format" lang="en" ></date-picker>   
     <p class="ex1"></p>
     <date-picker v-model="value2" valueType="format" lang="en" ></date-picker>   
     <div class="col-sm-4"></div>     
   </div>


  <div class="container-fluid">
      <div class="row" style="padding: 40px; margin-bottom: 40px">
      <div class="col-md-6 offset-md-3"> 
      <div class="input-group input-group-lg container">
            <input v-model="search" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Find the best plan for your destination...">
            <div class="input-group-prepend">
            <span  @click="change(search)" class="input-group-text" id="inputGroup-sizing-lg">Search</span>
            </div>
      </div>
      </div>
      </div>
      <div>
          <p class="lead" style="font-size: 25px">OUR TOP DESTINATIONS</p>
      </div>
      <div class="row">
            <div @click="change(country.country)" v-for="country in countryObjects" class="col-sm-3" v-bind:key="country.country"><DestinationBox    v-bind:locationName="country.country" v-bind:imgLink="country.img" ></DestinationBox></div>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import DestinationBox from '../components/DestinationBox.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import DatePicker from 'vue2-datepicker';
export default {
    
  name: 'Home',

  components: {
    DestinationBox,DatePicker
  },
  data()  {
      return {
        countryObjects: null,
        search: "",
        value1: '',
        value2: '',
        time3: '',
        lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
        placeholder: {
          date: 'Select Date',
          dateRange: 'Select Date Range'
        }
      },
      // custom range shortcuts
      shortcuts: [
        {
          text: 'Today',
          onClick: () => {
            this.time3 = [ new Date(), new Date() ]
          }
        }
      ],
      timePickerOptions:{
        start: '00:00',
        step: '00:30',
        end: '23:30'
      }
    }
      },
      
      
    
  methods: {
    change: function(location) {
        this.$store.state.selectedLocation = location;
        
        axios.get('http://localhost:3000/countryPlans/?name=' + location + "&plan=" + this.$store.state.nextPlan).then(response => {
          this.$store.state.planArray = response.data;
          if(this.$store.state.planArray.length > 0) {
            this.$router.push('/order');
          
            this.$store.state.nextPlan = this.$store.state.planArray[this.$store.state.planArray.length-1].id;
              console.log(this.$store.state.nextPlan)
          } else {
            this.$swal("No plans found", "Try another location", "error");
          }
        }).catch(error =>  this.$swal("Something happened", "Were working on it...", "error"));
        
    }
  },

  mounted() {
    axios.get('http://localhost:3000/topCountries').then(response => (this.countryObjects = response.data));
  }
}
</script>

<style>
p.ex1 {
   
  padding: 25px;
}

</style>