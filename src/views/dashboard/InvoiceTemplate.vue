<script setup>
  import router from '@/router';
import axios from 'axios';
  import { toast } from 'bulma-toast';
  import fileDownload from 'js-file-download';
  import { ref, onMounted } from 'vue';
  
  const invoice = ref({});
  const items = ref([]);

  //use case error
  items
  
  const getInvoice = () => {
    const invoiceID = router.params.id;
  
    axios.get(`/api/v1/invoices/${invoiceID}`)
      .then(response => {
        invoice.value = response.data;
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };
  
  const getPdf = () => {
    const invoiceID = router.params.id;
  
    axios.get(`/api/v1/invoices/${invoiceID}/generate_pdf/`, {
        responseType: 'blob',
      })
      .then(res => {
        fileDownload(res.data, `invoice_${invoiceID}.pdf`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  const getStatusLabel = () => {
    return invoice.value.is_paid ? 'Is paid' : 'Is not paid';
  };
  
  const getInvoiceType = () => {
    return invoice.value.invoice_type === 'credit_note' ? 'Credit note' : 'Invoice';
  };
  
  const getItemTotal = (item) => {
    const unit_price = item.unit_price;
    const quantity = item.quantity;

    //use case error 
    unit_price
    quantity

    const total = item.net_amount + (item.net_amount * (item.vat_rate / 100));
    return parseFloat(total).toFixed(2);
  };
  
  const setAsPaid = async () => {
    invoice.value.is_paid = true;
  
    const items = invoice.value.items;
    delete invoice.value['items'];
  
    try {
      await axios.patch(`/api/v1/invoices/${invoice.value.id}/`, invoice.value);
      toast({
        message: 'The changes were saved',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right'
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  
    invoice.value.items = items;
  };
  
  const createCreditNote = async () => {
    invoice.value.is_credited = true;
    const items = invoice.value.items;
    delete invoice.value['items'];
  
    try {
      await axios.patch(`/api/v1/invoices/${invoice.value.id}/`, invoice.value);
      toast({
        message: 'The changes were saved',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right'
      });
  
      const creditNote = { ...invoice.value };
      creditNote.is_credit_for = invoice.value.id;
      creditNote.is_credited = false;
      creditNote.invoice_type = 'credit_note';
      delete creditNote['id'];
  
      await axios.post('api/v1/invoices/', creditNote);
      toast({
        message: 'The credit note was created',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right'
      });
  
      router.push('/dashboard/invoices');
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  
    invoice.value.items = items;
  };
  
  const sendReminder = () => {
    axios.get(`/api/v1/invoices/${invoice.value.id}/send_reminder/`)
      .then(response => {
        toast({
          message: 'The reminder was sent',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right'
        });

        //user case error
        response
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  onMounted(getInvoice);
</script>
  

<template>
    <div class="page-invoice">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li><router-link to="/dashboard/invoices">Invoices</router-link></li>
                <li class="is-active"><router-link :to="{ name: 'Invoice', params: { id: invoice.id }}" aria-current="true">{{ invoice.invoice_number }}</router-link></li>
            </ul>
        </nav>

        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Invoice - {{ invoice.invoice_number }}</h1>

                <div class="buttons">
                    <button @click="getPdf()" class="button is-dark">Download PDF</button>

                    <template v-if="!invoice.is_credit_for && !invoice.is_credited">
                        <button @click="setAsPaid()" class="button is-success" v-if="!invoice.is_paid">Set as paid</button>
                        <button @click="createCreditNote()" class="button is-danger" v-if="!invoice.is_paid">Create credit note</button>
                    </template>

                    <button @click="sendReminder()" class="button is-info" v-if="!invoice.is_paid && !invoice.is_credit_for">Send reminder</button>
                </div>
            </div>

            <div class="column is-12 mb-4">
                <div class="box">
                    <h3 class="is-size-4 mb-5">Client</h3>

                    <p><strong>{{ invoice.client_name }}</strong></p>
                    
                    <p v-if="invoice.client_address1">{{ invoice.client_address1 }}</p>
                    <p v-if="invoice.client_address2">{{ invoice.client_address2 }}</p>
                    <p v-if="invoice.client_zipcode || invoice.client_place">{{ invoice.client_zipcode }} {{ invoice.client_place }}</p>
                    <p v-if="invoice.client_country">{{ invoice.client_country }}</p>
                </div>
            </div>

            <div class="column is-12 mb-4">
                <div class="box">
                    <h3 class="is-size-4 mb-5">Items</h3>

                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Vat rate</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr 
                                v-for="item in invoice.items"
                                v-bind:key="item.id"
                            >
                                <td>{{ item.title }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.vat_rate }}%</td>
                                <td>{{ getItemTotal(item) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="column is-12">
                <div class="box">
                    <h3 class="is-size-4 mb-5">Summary</h3>

                    <div class="columns">
                        <div class="column is-6">
                            <p><strong>Net amount</strong>: {{ invoice.net_amount }}</p>
                            <p><strong>Vat amount</strong>: {{ invoice.vat_amount }}</p>
                            <p><strong>Gross amount</strong>: {{ invoice.gross_amount }}</p>
                            <p><strong>Bank account</strong>: {{ invoice.bankaccount }}</p>
                        </div>
                    
                        <div class="column is-6">
                            <p><strong>Our reference</strong>: {{ invoice.sender_reference }}</p>
                            <p><strong>Client reference</strong>: {{ invoice.client_contact_reference }}</p>
                            <p><strong>Due date</strong>: {{ invoice.get_due_date_formatted }}</p>
                            <p><strong>Status</strong>: {{ getStatusLabel() }}</p>
                            <p><strong>Invoice type</strong>: {{ getInvoiceType() }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>