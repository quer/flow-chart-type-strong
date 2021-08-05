<?php
header("Content-Type: application/json; charset=UTF-8");

$outp = array(
    'moduler' => array(
        array(
            'ID' => 1, 
            'Name' => 'test', 
            'input' => array(
                array(
                    'ID' => '1_I_1',
                    'Name' => 'Start',
                    'type' => 'Start'
                ) 
            ), 
            'output' => array(
                array(
                    'ID' => '1_O_1',
                    'Name' => 'GroupId',
                    'type' => 'GroupId'
                ),
                array(
                    'ID' => '1_O_2',
                    'Name' => 'Group Text',
                    'type' => 'text'
                ),
            )
        ),
        array(
            'ID' => 2, 
            'Name' => 'Start', 
            'output' => array(
                array(
                    'ID' => '2_O_1',
                    'Name' => 'Start',
                    'type' => 'Start'
                ) 
            )
        ),
        //start test
        array(
            'ID' => 3, 
            'Name' => 's', 
            'input' => array(
                array(
                    'ID' => '3_I_1',
                    'Name' => '1',
                    'type' => '1'
                ),
                array(
                    'ID' => '3_I_2',
                    'Name' => '2',
                    'type' => '2'
                ) 
            ), 
            'output' => array(
                array(
                    'ID' => '3_O_1',
                    'Name' => '2',
                    'type' => '2'
                ) 
            )
        ),
        array(
            'ID' => 4, 
            'Name' => 'ss', 
            'input' => array(
                array(
                    'ID' => '4_I_1',
                    'Name' => '1',
                    'type' => '1'
                ),
                array(
                    'ID' => '4_I_2',
                    'Name' => '3',
                    'type' => '3'
                ),
                array(
                    'ID' => '4_I_3',
                    'Name' => '4',
                    'type' => '4'
                ) 
            ), 
            'output' => array(
                array(
                    'ID' => '4_O_1',
                    'Name' => '2',
                    'type' => '2'
                ) 
            )
        ),
        array(
            'ID' => 5, 
            'Name' => 'sss', 
            'input' => array(
                array(
                    'ID' => '5_I_1',
                    'Name' => '2',
                    'type' => '2'
                )
            ), 
            'output' => array(
                array(
                    'ID' => '5_O_1',
                    'Name' => '1',
                    'type' => '1'
                ),
                array(
                    'ID' => '5_O_2',
                    'Name' => '3',
                    'type' => '3'
                )
            )
        ),
        // end test
    ),
    'load' => "{\"boxes\":[{\"ID\":5,\"RealId\":1,\"x\":\"684px\",\"y\":\"169px\"},{\"ID\":4,\"RealId\":5,\"x\":\"1020px\",\"y\":\"52px\"},{\"ID\":3,\"RealId\":10,\"x\":\"1270px\",\"y\":\"358px\"},{\"ID\":5,\"RealId\":14,\"x\":\"1610px\",\"y\":\"517px\"},{\"ID\":5,\"RealId\":18,\"x\":\"35px\",\"y\":\"275px\"},{\"ID\":4,\"RealId\":22,\"x\":\"425px\",\"y\":\"448px\"},{\"ID\":3,\"RealId\":27,\"x\":\"379px\",\"y\":\"166px\"}],\"connection\":[{\"FromID\":\"5_O_1\",\"FromRealId\":1,\"ToID\":\"3_I_1\",\"ToRealId\":10},{\"FromID\":\"5_O_2\",\"FromRealId\":1,\"ToID\":\"4_I_2\",\"ToRealId\":5},{\"FromID\":\"4_O_1\",\"FromRealId\":5,\"ToID\":\"3_I_2\",\"ToRealId\":10},{\"FromID\":\"3_O_1\",\"FromRealId\":10,\"ToID\":\"5_I_1\",\"ToRealId\":14},{\"FromID\":\"5_O_1\",\"FromRealId\":18,\"ToID\":\"3_I_1\",\"ToRealId\":27},{\"FromID\":\"5_O_2\",\"FromRealId\":18,\"ToID\":\"4_I_2\",\"ToRealId\":22},{\"FromID\":\"3_O_1\",\"FromRealId\":27,\"ToID\":\"5_I_1\",\"ToRealId\":1}]}"
);

echo json_encode($outp);
?>