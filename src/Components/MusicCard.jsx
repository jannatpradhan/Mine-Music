import React from 'react'
import { Button, Card, Image,Icon } from 'semantic-ui-react'

const MusicCard = (props) => (
  
  <Card style={{ margin: "30px" }} key={props.keys}>
  <Image src={props.images} wrapped ui={false} />
  <Card.Content>
    <Card.Header>{props.name}</Card.Header>
    <Card.Meta>{props.release}</Card.Meta>
    <Card.Description>
      
    </Card.Description>
  </Card.Content>
  <Card.Content extra>
    <a>
    <audio src={props.audio} style={{ maxWidth: "100%" }} controls ></audio>
    </a>
  </Card.Content>
</Card>

)

export default MusicCard;
