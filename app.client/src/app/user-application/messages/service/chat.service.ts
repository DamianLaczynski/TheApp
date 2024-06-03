import { Injectable, inject } from '@angular/core';
import { UDPService } from './udp.service';
import { Peer } from '../model/payload';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private udpService = inject(UDPService);
  myNickname: string = 'guest';
  otherPeer?: Peer;

  messageStack = new BehaviorSubject<string[]>([]);

  constructor() {}

  start(nickname: string, peerAddress: string, myNickname: string) {
    this.myNickname = myNickname;

    const address = peerAddress.split(':');

    this.udpService.configureClient();
    this.otherPeer = {
      nickname: nickname,
      address: address[0],
      port: Number(address[1]),
    };
    this.send(`hello from ${myNickname}`);

    //this.udpService.onMessage((message) => this.messageStack.next([...this.messageStack.value, message]));
    this.udpService.onMessage((message) => console.log(message));

  }

  send(message: string)
  {
    if(this.otherPeer)
    this.udpService.sendMessage(message, this.otherPeer?.port, this.otherPeer?.address)
  }
}
