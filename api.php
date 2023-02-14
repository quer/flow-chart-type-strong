<?php
header("Content-Type: application/json; charset=UTF-8");

$outp = array(
    'moduler' => array(
        array(
            'ID' => 1, 
            'Name' => 'test', 
            'width' => 300,
            'field' => array(
                array(
                    'ID' => '1_F_1',
                    'text' => 'Start',
                    'type' => 'checkbox',
                    'values'=> array('HTML', 'CSS'),
                    'mandatory' => true
                ),
                array(
                    'ID' => '1_F_2',
                    'text' => 'GroupID',
                    'type' => 'input',
                    'mandatory' => true
                ),
                array(
                    'ID' => '1_F_3',
                    'text' => 'What to jump?',
                    'type' => 'radio',
                    'values'=> array('yes', 'no'),
                    'mandatory' => true
                )
            ),
            'input' => array(
                array(
                    'ID' => '1_I_1',
                    'Name' => 'Start or 1',
                    'type' => array('Start', '1'),
                    'mandatory' => true
                ) 
            ), 
            'output' => array(
                array(
                    'ID' => '1_O_1',
                    'Name' => 'GroupId',
                    'type' => 'GroupId',
                    'mandatory' => true
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
                    'Name' => '1 or 2',
                    'type' => array('2', '1')
                ),
                array(
                    'ID' => '5_O_2',
                    'Name' => '3',
                    'type' => '3'
                )
            )
        ),
        
        array(
            'ID' => 6, 
            'Name' => 'userInput1', 
            'output' => array(
                array(
                    'ID' => '1_O_1',
                    'Name' => '1',
                    'type' => '1'
                )
            )
        ),
        array(
            'ID' => 7, 
            'Name' => 'userInput2', 
            'output' => array(
                array(
                    'ID' => '1_O_1',
                    'Name' => '2',
                    'type' => '2'
                )
            )
        ),
        array(
            'ID' => 8, 
            'Name' => 'userInput3', 
            'output' => array(
                array(
                    'ID' => '1_O_1',
                    'Name' => '3',
                    'type' => '3'
                )
            )
        ),
        
        array(
            'ID' => 9, 
            'Name' => 'userInput4', 
            'output' => array(
                array(
                    'ID' => '1_O_1',
                    'Name' => '4',
                    'type' => '4'
                )
            )
        ),
        // end test
    ),
    //'load' => "{\"boxes\":[{\"ID\":5,\"RealId\":1,\"x\":\"684px\",\"y\":\"169px\",\"fields\":[]},{\"ID\":4,\"RealId\":5,\"x\":\"1020px\",\"y\":\"52px\",\"fields\":[]},{\"ID\":3,\"RealId\":10,\"x\":\"1270px\",\"y\":\"358px\",\"fields\":[]},{\"ID\":5,\"RealId\":14,\"x\":\"1610px\",\"y\":\"517px\",\"fields\":[]},{\"ID\":5,\"RealId\":18,\"x\":\"35px\",\"y\":\"275px\",\"fields\":[]},{\"ID\":4,\"RealId\":22,\"x\":\"425px\",\"y\":\"448px\",\"fields\":[]},{\"ID\":3,\"RealId\":27,\"x\":\"379px\",\"y\":\"166px\",\"fields\":[]},{\"ID\":1,\"RealId\":31,\"x\":\"79px\",\"y\":\"646px\",\"fields\":[{\"fieldID\":\"1_F_1\",\"checked\":[0,1]},{\"fieldID\":\"1_F_2\",\"value\":\"asd\"},{\"fieldID\":\"1_F_3\",\"checked\":0}]},{\"ID\":1,\"RealId\":38,\"x\":\"732px\",\"y\":\"650px\",\"fields\":[{\"fieldID\":\"1_F_1\",\"checked\":[1]},{\"fieldID\":\"1_F_2\",\"value\":\"3\"},{\"fieldID\":\"1_F_3\",\"checked\":1}]},{\"ID\":1,\"RealId\":45,\"x\":\"1232px\",\"y\":\"671px\",\"fields\":[{\"fieldID\":\"1_F_1\",\"checked\":[0]},{\"fieldID\":\"1_F_2\",\"value\":\"2\"}]}],\"connection\":[{\"FromID\":\"5_O_1\",\"FromRealId\":1,\"ToID\":\"3_I_1\",\"ToRealId\":10},{\"FromID\":\"5_O_2\",\"FromRealId\":1,\"ToID\":\"4_I_2\",\"ToRealId\":5},{\"FromID\":\"4_O_1\",\"FromRealId\":5,\"ToID\":\"3_I_2\",\"ToRealId\":10},{\"FromID\":\"3_O_1\",\"FromRealId\":10,\"ToID\":\"5_I_1\",\"ToRealId\":14},{\"FromID\":\"5_O_1\",\"FromRealId\":18,\"ToID\":\"3_I_1\",\"ToRealId\":27},{\"FromID\":\"5_O_2\",\"FromRealId\":18,\"ToID\":\"4_I_2\",\"ToRealId\":22},{\"FromID\":\"3_O_1\",\"FromRealId\":27,\"ToID\":\"5_I_1\",\"ToRealId\":1}]}"
    'load' => '{"boxes":[{"ID":5,"RealId":1,"x":"1136px","y":"435px","fields":[]},{"ID":4,"RealId":5,"x":"1465px","y":"198px","fields":[]},{"ID":3,"RealId":10,"x":"1727px","y":"546px","fields":[]},{"ID":5,"RealId":14,"x":"1972px","y":"809px","fields":[]},{"ID":5,"RealId":18,"x":"412px","y":"668px","fields":[]},{"ID":4,"RealId":22,"x":"936px","y":"954px","fields":[]},{"ID":3,"RealId":27,"x":"784px","y":"404px","fields":[]},{"ID":6,"RealId":31,"x":"68px","y":"21px","fields":[]},{"ID":7,"RealId":33,"x":"66px","y":"404px","fields":[]},{"ID":7,"RealId":35,"x":"64px","y":"599px","fields":[]},{"ID":9,"RealId":37,"x":"71px","y":"209px","fields":[]},{"ID":6,"RealId":39,"x":"79px","y":"806px","fields":[]},{"ID":9,"RealId":41,"x":"77px","y":"1003px","fields":[]}],"connection":[{"FromID":"5_O_1","FromRealId":1,"ToID":"3_I_1","ToRealId":10},{"FromID":"5_O_2","FromRealId":1,"ToID":"4_I_2","ToRealId":5},{"FromID":"4_O_1","FromRealId":5,"ToID":"3_I_2","ToRealId":10},{"FromID":"3_O_1","FromRealId":10,"ToID":"5_I_1","ToRealId":14},{"FromID":"5_O_1","FromRealId":18,"ToID":"3_I_1","ToRealId":27},{"FromID":"5_O_2","FromRealId":18,"ToID":"4_I_2","ToRealId":22},{"FromID":"3_O_1","FromRealId":27,"ToID":"5_I_1","ToRealId":1},{"FromID":"1_O_1","FromRealId":31,"ToID":"4_I_1","ToRealId":5},{"FromID":"1_O_1","FromRealId":33,"ToID":"3_I_2","ToRealId":27},{"FromID":"1_O_1","FromRealId":35,"ToID":"5_I_1","ToRealId":18},{"FromID":"1_O_1","FromRealId":37,"ToID":"4_I_3","ToRealId":5},{"FromID":"1_O_1","FromRealId":39,"ToID":"4_I_1","ToRealId":22},{"FromID":"1_O_1","FromRealId":41,"ToID":"4_I_3","ToRealId":22}]}'
);

echo json_encode($outp);
?>