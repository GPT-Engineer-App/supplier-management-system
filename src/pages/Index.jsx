import { Box, Button, Container, Flex, Heading, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, Text, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [fornitori, setFornitori] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFornitore, setCurrentFornitore] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    contattoNome: "",
    contattoEmail: "",
    contattoTelefono: "",
    indirizzo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      contattoNome: "",
      contattoEmail: "",
      contattoTelefono: "",
      indirizzo: "",
    });
  };

  const handleOpenModal = (fornitore = null) => {
    if (fornitore) {
      setEditMode(true);
      setCurrentFornitore(fornitore);
      setFormData({ ...fornitore });
    } else {
      setEditMode(false);
      resetForm();
    }
    onOpen();
  };

  const handleSubmit = () => {
    if (editMode) {
      setFornitori(fornitori.map((f) => (f.id === currentFornitore.id ? { ...formData, id: f.id } : f)));
    } else {
      setFornitori([...fornitori, { ...formData, id: Date.now() }]);
    }
    onClose();
    toast({
      title: editMode ? "Fornitore Modificato" : "Fornitore Aggiunto",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    setFornitori(fornitori.filter((f) => f.id !== id));
    toast({
      title: "Fornitore Eliminato",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" mb="8">
        Gestione Fornitori
      </Heading>
      <Flex justify="space-between" align="center" mb="4">
        <Text>Elenco Fornitori</Text>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => handleOpenModal()}>
          Aggiungi Fornitore
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Contatto</Th>
            <Th>Indirizzo</Th>
            <Th>Azioni</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fornitori.map((fornitore) => (
            <Tr key={fornitore.id}>
              <Td>{fornitore.nome}</Td>
              <Td>
                {fornitore.contattoNome}
                <br />
                {fornitore.contattoEmail}
                <br />
                {fornitore.contattoTelefono}
              </Td>
              <Td>{fornitore.indirizzo}</Td>
              <Td>
                <IconButton icon={<FaEdit />} aria-label="Modifica fornitore" onClick={() => handleOpenModal(fornitore)} />
                <IconButton icon={<FaTrash />} aria-label="Elimina fornitore" colorScheme="red" ml="2" onClick={() => handleDelete(fornitore.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? "Modifica Fornitore" : "Aggiungi Fornitore"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input placeholder="Nome" name="nome" value={formData.nome} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Contatto Nome</FormLabel>
              <Input placeholder="Nome del contatto" name="contattoNome" value={formData.contattoNome} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" name="contattoEmail" value={formData.contattoEmail} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Telefono</FormLabel>
              <Input placeholder="Telefono" name="contattoTelefono" value={formData.contattoTelefono} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Indirizzo</FormLabel>
              <Input placeholder="Indirizzo" name="indirizzo" value={formData.indirizzo} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Salva
            </Button>
            <Button onClick={onClose}>Annulla</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
