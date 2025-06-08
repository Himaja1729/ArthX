"use client";
import { updateDefaultAccount } from '@/actions/accounts';
import { Card,CardContent,CardHeader,CardTitle,CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { parse } from 'date-fns';
import {  ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AccountCard = ({ account }) => {

const {name,type,balance,id,isDefault} = account;
  const{
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,   
    error,
  }= useFetch(updateDefaultAccount);

const handleDefaultChange = async () => {   
event.preventDefault();
if(isDefault){
    toast.warning("You need atleast 1 default account");
    return;
}
await updateDefaultFn(id);
};

useEffect(() => {
if(updatedAccount?.success){
    toast.success("Default account updated successfully");
}
},[updatedAccount,updateDefaultLoading]);

useEffect(() => {
if(error){
    toast.error(error.message||"Failed to update default account");
}
},[error]);

 return(
    <Card className="hover:shadow-md transaction-shadow group relative">
        <Link href={'/account/${id}'}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium capitalize">
        {name}</CardTitle>
      <Switch checked={isDefault} onClick ={handleDefaultChange}
      disabled={updateDefaultLoading}
      />
    </CardHeader>
    <CardContent>
     <div className='text-2xl font-bold'>
    ${parseFloat(balance).toFixed(2)}
     </div>
     <p className='text-xs text-muted-foreground capitalize'>
        {type.charAt(0)+type.slice(1).toLowerCase()} account

     </p>
    </CardContent>
    <CardFooter className="flex justify-between text-sm text-muted-foreground">
      <div className='flex items-center'>
        <ArrowUpRight className='h-4 w-4 mr-1 text-green-500' />
        Income

      </div>
      <div className='flex items-center'>
        <ArrowDownRight className='h-4 w-4 mr-1 text-red-500' />
        Expense
      </div>
    </CardFooter>
    </Link>
  </Card>
 );
};

export default AccountCard;
