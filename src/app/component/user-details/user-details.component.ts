import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as Leaflet from 'leaflet';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/service/user.service';
import { Coordinates } from 'src/app/interface/coordinates.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';
  marker = new Leaflet.Icon({
    iconUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize:[32,41],
    iconAnchor:[12,41],
    popupAnchor:[1,-34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41,41]
    
  });
  ngOnInit(): void {
    this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0])) 
      console.log(this.user);
      this.loadMap(this.user.coordinates);


    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   console.log('User ID: ',params.get('uuid')!);  
    //   this.userService.getUser(params.get('uuid')!).subscribe(
    //   (response:any ) =>{
    //       console.log(response); 
    //       this.user = (<User>(response.results[0]));
    //       this.loadMap(this.user.coordinates);//   });
    // });
  }

  public changeMode(mode?: 'edit' | 'locked'):void{
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit' ;
    if (mode === 'edit'){
      console.log('Updating user in the backed ');
      
    }
  }

  private loadMap(coordinate: Coordinates): void {
    console.log(coordinate);
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: 8
    });

    
    const mainLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 19,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(map);
     const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], { icon: this.marker });
     marker.addTo(map).bindPopup(`${this.user.firstName}'s Location`).openPopup();


  }
}
