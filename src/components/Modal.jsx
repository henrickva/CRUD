'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input, 
    Center,
    useToast
  } from "@chakra-ui/react";
import { useState } from "react";
  


export default function ModalComponent({data, setData, dataEdit, isOpen, onClose}){

    const [name,setName] = useState(dataEdit.name ||'')
    const [email,setEmail] = useState(dataEdit.email ||'')
    const [job, setJob] = useState(dataEdit.job ||'')

    const toast = useToast()

    function handleSave() {
        if(!name || !email) return    
        
        if (emailAlreadyExists()) {
        return (toast({
            title: 'E-mail indisponivel',
            description: "Esse e-mail já existe, tente preencher com outro",
            status: 'error',
            duration: 9000,
            isClosable: true,
          }))
        }
  
        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, job, email };
        }
    
        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, job, email }]
            : [...(data ? data : [])];
    
        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
    
        setData(newDataArray);
    
        onClose()
    }

    function emailAlreadyExists() {
        if (dataEdit.email !== email && data?.length) {
          return data.find((item) => item.email === email);
        }
    
        return false;
      };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
        {/*Conteudo do Modal, cabeçalho e modal close são os necessários para aparecer o modal
            O ModalOverlay faz com que fique mais escuro a parte de trás.
        */}
          <ModalOverlay />
            <ModalContent> 
                <ModalHeader>Cadastro</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel m={1}>Nome</FormLabel>
                            <Input mb={2} type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <FormLabel m={1}>Profissão</FormLabel>
                            <Input mb={2} type='text' 
                                value={job}
                                onChange={(e) => setJob(e.target.value)}/>

                            <FormLabel m={1}>Email</FormLabel>
                            <Input mb={2} type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}                           
                            />
                            <Center>
                                <Button onClick={handleSave}colorScheme="whatsapp" m='2'>Salvar</Button>
                                <Button colorScheme="red" m='2' onClick={onClose}>Cancelar</Button>
                            </Center>
                        </FormControl>  
                    </ModalBody>
            </ModalContent>
        </Modal>
      </>
    );
};