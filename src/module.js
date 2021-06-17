const sleep = (time) => new Promise(resolve => {
    setTimeout ( resolve, time);
})

const start = async () => {
    console.log('first',  );
    await sleep(2000);
    console.log('second',  );
    console.log('third',  );
}

start().then();
