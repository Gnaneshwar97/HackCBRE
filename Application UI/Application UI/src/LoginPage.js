import React, { useState } from 'react';
import DropdownExample from './DropdownExample.js';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import MyComponent from './MyComponent.js'

const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongLogin, setWrongLogin] = useState(false);

  const handleLogin = () => {
    // Add your login logic here (e.g., check if username and password are correct)
        const enteredUsername = username;
        const enteredPassword = password;
        var userList = "Charles Potts,Shannon Rose,Kristen Daugherty,Michael Patrick,Derrick Stephenson,Mitchell Crawford,Dr. Justin Nguyen,Allison Dominguez DVM,Susan Simon,Seth Herrera,David James,Robert Valdez,Carl Ramirez,Dillon Wiley,Veronica Garza,Mrs. Teresa Dorsey MD,Patricia Cain,Zachary Woods,Shannon Perkins,Joseph Richardson,Mrs. Julia Carter,Alexandra Wagner,Danielle Davis,Jason Hill,Joy Duran,Gerald Watson,William Coleman,Lisa Hoffman,Christian Davis,Bobby George,Charles Love,Eugene Scott,Karen Heath,Andrea Valdez,Robin Mclaughlin,Craig Rogers,Jesse Lucas,Anna Gibson,Micheal Clark,Tiffany Hernandez,Tammy Anderson,Ariel Miller,Mary Yang,Lauren Bryan,Jasmine Johnson,Joshua Williams,Scott Palmer,Christian Harmon,Joseph Stout,Jody Martinez,Shannon Forbes MD,Dennis Gibson,Scott Hicks,Heather Woodward,Valerie Jones,Brian Hansen,Mrs. Tracie Stephens DDS,Emily Smith,Alicia Ryan,Chase Ramos,Jeffrey Dunn,Monique Hodges,David Cole,Darryl Curtis,Nathaniel Griffin,Patrick Stewart,Gerald Carter,Patrick Haas,Kim Decker,Daniel Chambers,Larry Duncan,Franklin Gibson MD,Bradley Jenkins,Virginia Walton,Gregory Brown,Audrey Hamilton,Andrea Long,Ronald Pineda,Kevin Kennedy,Diana Cooper,John Wright,Christopher Wood,Debra Davidson,Stephen Conway,Frederick Goodman,Melissa Phillips,Frank Davis,Jeremy White,Amanda Wise,Julie Wright,Tina Thompson,Tara Parker,Wesley Smith,Michael Bryant,Danielle Wilson,Theodore Meza,Justin Odonnell,Edward Martinez,Gina Hahn,Mary Burgess,Edward Gibson,Jamie Stanton,Michelle Bryant,Dawn Thompson,Stephanie Williams,Adriana Martinez,Desiree Smith,Jordan Lawrence,Phillip Price,Karen Fernandez,Leah Lang,Elizabeth Wood,William Blackwell,Marcus Tate,Angel Rodriguez,Ryan Mays,Steven Mercer,Harold Carrillo,Amanda Clark,Miss Rebecca Maldonado,Tracy Reynolds,Nathaniel Stuart,Robert Winters,Scott Vega,Jessica Fischer,Johnathan Bennett,Michelle Mcdonald,Tyler Hawkins,Patricia Martin,Brandon Ellis,Justin Williams,Betty Lin,Vanessa Powell,Kevin Cross,Dustin Hernandez,Jeffrey Little,Debbie Smith,William Smith,Stacey Flores,Rebecca Bullock,Haley Chen,Larry Buchanan,Julie Anderson,Michelle Farrell,Cody Rivas,Jessica Kline,Angelica Novak,Richard Gomez,Sherry Tran,Nicole Hines,Kimberly Brooks,Debra Jones,Brian Kelly,Theodore Collins,April Jackson,Ashley Johnson,Stephanie Nelson,Jessica Johnson,William Combs,Sheena Avila,Christopher Day,Kristopher Murray,Maria Williams,Susan Pugh,Mark Matthews,Tammy Foster,David Solomon,Ralph Lamb,Andrew Gray,Brian Graves,Megan Vasquez,Nathan Bridges,Paula Morrison,Jerry Scott,Paul Allen,Tara Cochran,Jennifer Harrington,Jordan Rivera,Jennifer Glenn DDS,Diana Wright,Bryan Jordan,Mr. Jacob Lawson,Jose Campbell,Crystal Anderson,Kristina Peters,Whitney Richards,Dr. Karen Ortega MD,Kenneth Johnson,John Vega,Kayla Gutierrez,Mary Byrd,Albert Anderson,Steven Roberson,Carlos Montgomery,Kaitlin Campbell,Brian Diaz,Mrs. Regina Armstrong,Kathleen Hamilton,Lisa Valdez,Casey Barry";
    //userList.includes(enteredUsername)
    if (true) {
      setLoggedIn(true);
    }
    else{
    setWrongLogin(true);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <DashboardPage uname={username}/>
      ) : (
        <div className="login-form">
              <Grid
                textAlign="center"
                style={{ height: '100vh' }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as="h2" color="teal" textAlign="center">
                    <Image src="/logo.png" /> Log-in to your account
                  </Header>
                  <Form size="large">
                    <Segment stacked>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <Button color="teal" fluid size="large" onClick={handleLogin}>
                        Login
                      </Button>
{
                     (wrongLogin) ? <div class="ui  red basic label">
                                                                  Enter the correct User!
                                                                </div> : ''
                      }
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
            </div>
      )}
    </div>
  );
};

const DashboardPage = (props) => {

  return (
    <div>

      <MyComponent usr={props.uname}/>
    </div>
  );
};

export default LoginPage;



