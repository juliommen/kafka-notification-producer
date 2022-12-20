import { Kafka } from 'kafkajs'
import {randomUUID} from 'node:crypto'
 
async function sendMessage(){

  const kafka = new Kafka({
    clientId:'test-producer',
    brokers: ['glowing-moccasin-11952-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'Z2xvd2luZy1tb2NjYXNpbi0xMTk1MiSrYR7pzykCRYixkkLJhMELAHxNa6J0hqE',
      password: '**',
    },
    ssl: true,
  })
  
  const producer = kafka.producer()


  await producer.connect()

  await producer.send({
    topic:'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          category: 'Kafka',
          content: 'Nova mensagem do Kafka!',
          recipientId: randomUUID()
        })
        
      }
  ]
  })
  
  await producer.disconnect()
}

sendMessage()
