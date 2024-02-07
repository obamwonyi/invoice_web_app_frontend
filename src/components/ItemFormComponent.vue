<script setup>

//   import { computed, reactive, emit } from 'vue';
  

//   const props = defineProps(['initialItem']);

//   const item = reactive(props.initialItem);
  
//   const gross_amount = computed(() => {
//     const unit_price = item.unit_price;
//     const quantity = item.quantity;
//     const vat_rate = item.vat_rate;
//     let item_net = item.net_amount;
    
//     item_net = unit_price * quantity;
  
//     emit('updatePrice', item);
  
//     return item_net + (item_net * (vat_rate / 100));
//   });
</script>
  
<template>
    <div class="columns">
        <div class="column is-3">
            <div class="field">
                <label>Title</label>
                <div class="control">
                    <input type="text" class="input" v-model="item.title">
                </div>
            </div>
        </div>

        <div class="column is-3">
            <div class="field">
                <label>Price</label>
                <div class="control">
                    <input type="text" class="input" v-model="item.unit_price">
                </div>
            </div>
        </div>

        <div class="column is-2">
            <div class="field">
                <label>Quantity</label>
                <div class="control">
                    <input type="number" class="input" v-model="item.quantity">
                </div>
            </div>
        </div>

        <div class="column is-2">
            <div class="field">
                <label>Vat rate</label>
                <div class="control">
                    <div class="select">
                        <select v-model="item.vat_rate">
                            <option value="0">0%</option>
                            <option value="14">14%</option>
                            <option value="25">25%</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="column is-2">
            <div class="field">
                <label>Gross amount</label>
                <div class="control">
                    <input type="text" class="input" v-bind:value="gross_amount" disabled>
                </div>
            </div>
        </div>
    </div>
</template>